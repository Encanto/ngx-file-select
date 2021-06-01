/**
 *  Copyright (c) Encanto Squared LLC. All rights reserved.
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 *  this file except in compliance with the License. You may obtain a copy of the
 *  License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 *  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 *  MERCHANTABLITY OR NON-INFRINGEMENT.
 *
 *  See the Apache Version 2.0 License for specific language governing permissions
 *  and limitations under the License. 
 */

import express, { response } from 'express';
const cors = require('cors');
const HOME_DIR = require('os').homedir();
var fs = require("fs");
const fsPromises = fs.promises;
var path = require("path");

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function getStats(dirPath: any) {
    var stats = await fsPromises.stat(dirPath);
    return {
      folder: stats.isDirectory(),
      size: stats.size,
      mtime: stats.mtime.getTime()
    }    
}

app.get('/encanto/root', async function(req, res) {
        res.json({"path": HOME_DIR})
});

app.get('/encanto/list/:path?', async function(req, res) {
    let dirPath = req.params.path;
    // Path needs to be url encoded.
    if (dirPath) {
        dirPath = decodeURIComponent(dirPath);            
    } else {
        dirPath = '';
    }
    dirPath = path.join(HOME_DIR, dirPath);

    var stats = []; 
    try {
      var files = await fsPromises.readdir(dirPath);
      try {
        for (var i=0; i<files.length; ++i) {
          var fPath = path.join(dirPath, files[i]);
          var stat: any = await getStats(fPath);
          stat.name = files[i];

          // Example of filtering of a file type.
            /*
            if (stat.folder === true || 
                stat.folder === false && fPath.endsWith('.xlsx')) {
                stats.push(stat);  
            } 
            */
          stats.push(stat);  
        }
      } catch (e) {
        console.error('Error reading file in directory: ' + dirPath);
        stats = [];
      }
    } catch (e) {
      console.error('Error reading directory: ' + dirPath);
      stats = [];
    }
    res.send(stats);   
});

console.log('Start without ssl');

app.listen(1880, () => console.log('Server Demo listening on port 1880!'));