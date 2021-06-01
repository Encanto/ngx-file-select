const fs = require('fs-extra');
const concat = require('concat');

build = async () =>{
    const files = [
        './dist/ngx-file-select/runtime.js',
        './dist/ngx-file-select/polyfills.js',
        './dist/ngx-file-select/main.js'
      ];
    
      await concat(files, 'dist/ngx-file-select.js');
}
build();