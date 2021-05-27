import { Component, OnInit } from '@angular/core';
import { FileServiceService } from '../services/file-service.service';

@Component({
  selector: 'local-file-browse',
  templateUrl: './file-browse.component.html',
  styleUrls: ['./file-browse.component.css']
})
export class FileBrowseComponent implements OnInit {
  public files = [];
  public breadcrumbPaths = [];
  public selectedFile;
  private rootPath;

  constructor(private fileService: FileServiceService) {
  }

  ngOnInit(): void {
    this.fileService.getFiles("").subscribe(
      res => {
        this.files = <any> res;
      },
      err => {}
    );

    this.fileService.getRoot().subscribe(
      res => {
        this.rootPath = (<any> res).path;
      },
      err => {}
    );

    this.breadcrumbPaths.push({name: 'Home', path: ''});
  }

  /**
   * Tell the world about our selected file.
   */
  public doSelectFile() {
    // Compute the full path.
    if (this.selectedFile) {
      console.log('file selected: ' + this.rootPath + this.getCurrentPath() + '/' + this.selectedFile.name);
      let event = new CustomEvent("file-select", {
        detail: {
          path: this.rootPath + this.getCurrentPath() + '/' + this.selectedFile.name
        }
      });
      window.dispatchEvent(event);  
    }
  }

  public selectFile(file) {
    if (this.selectedFile != file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
      console.log('deselect file');
    }
  }

  /**
   * Take a file size and return it to a human readable value
   *
   * @param file File object
   * @returns Readable file size
   */
  public getHumanSize(file) {
    // Just return an empty size for folders
    if (file.folder) {
      return '';
    }
    let size = file.size;
    var hz;
    if (size < 1024) hz = size + ' B';
    else if (size < 1024*1024) hz = (size/1024).toFixed(2) + ' KB';
    else if (size < 1024*1024*1024) hz = (size/1024/1024).toFixed(2) + ' MB';
    else hz = (size/1024/1024/1024).toFixed(2) + ' GB';
    return hz;
  }

  public getHumanTime(file) {
    var t = new Date(file.mtime);
    return t.toLocaleDateString() + ' ' + t.toLocaleTimeString();
  }

  public getCssClass(file) {
    return file ? 'fa fa-folder-open-o' : 'fa fa-file-o';
  }

  private getCurrentPath() {
    return this.breadcrumbPaths[this.breadcrumbPaths.length - 1].path;
  }

  /**
   * Navigate to another folder.
   * 
   * @param file - Folder object that was selected that we are going to navigate to.
   */
  public navigate(file) {
    // Clear the current selections.
    this.selectedFile = null;

    if (file.folder) {
      let lastBreadcrumbPath = this.getCurrentPath();
      this.breadcrumbPaths.push({name: file.name, path: lastBreadcrumbPath + '/' + file.name});
      console.log('adding breadcrumb path: ' + lastBreadcrumbPath + '/' + file.name);
      this.fileService.getFiles(lastBreadcrumbPath + '/' + file.name).subscribe(
        res => {
          this.files = <any> res;
        },
        err => {}
      );
    }
  }

  /**
   * Reconstruct the breadcrumbs after we navigate to a new path.
   *
   * @param newPath - Path that we navigated to. 
   */
  public updatePath(newPath) {
    // Update the breadcrumbs
    for (let i=0; i<this.breadcrumbPaths.length; i++) {
      if (this.breadcrumbPaths[i].path == newPath) {
        // Remove.
        this.breadcrumbPaths.splice(i+1);
        break;
      }
    }

    // Update the path
    let lastBreadcrumbPath = this.breadcrumbPaths[this.breadcrumbPaths.length - 1].path;
    this.fileService.getFiles(lastBreadcrumbPath).subscribe(
      res => {
        this.files = <any> res;
      },
      err => {}
    );
  }

}

