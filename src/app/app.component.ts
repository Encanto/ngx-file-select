import { Component } from '@angular/core';
import { FileServiceService } from './services/file-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
    )
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

  title = 'ngx-file-select';
}
