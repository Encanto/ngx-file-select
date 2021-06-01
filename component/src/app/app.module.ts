import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { HttpClientModule } from '@angular/common/http';
import { FileBrowseComponent } from './file-browse/file-browse.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  declarations: [FileBrowseComponent]
})
export class AppModule {

  constructor(private injector: Injector) {

  }

  ngDoBootstrap(){
    const fbComp = createCustomElement(FileBrowseComponent, { injector: this.injector });
    if (!customElements.get('file-browse')) {
        customElements.define('file-browse', fbComp);  
    }
  }

 }
