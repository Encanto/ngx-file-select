import { Component } from '@angular/core';
import { FileServiceService } from './services/file-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-file-select';
  public files = [];
  public breadcrumbPaths = [];

  constructor(private fileService: FileServiceService) {
  }

  ngOnInit(): void {
    this.fileService.getFiles("").subscribe(
      res => {
        this.files = <any> res;
      },
      err => {}
    );

    this.breadcrumbPaths.push({name: 'Home', path: ''});
  }

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

  public select(file) {
    if (file.folder) {
      let lastBreadcrumbPath = this.breadcrumbPaths[this.breadcrumbPaths.length - 1].path;
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
