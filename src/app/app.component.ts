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

  public getCssClass(file) {
    return file ? 'fa fa-folder-o fa-lg' : 'fa fa-file-o fa-lg';
  }

  title = 'ngx-file-select';
}
