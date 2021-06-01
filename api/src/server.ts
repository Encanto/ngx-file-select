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


export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const BASE_URI= '/api';
const HOME_DIR = require('os').homedir();
var runtimeAPI;
var fs = require("fs");
var path = require("path");


app.get('*', function (req, res) {
    Auth.signUp({
        username: 'AmandaB',
        password: 'MyCoolPassword1!',
        attributes: {
            email: 'someemail@example.com',
        },
    });

    res.status(500);
    res.send('API Response to route:' + req.originalUrl);
});

async function getStats(dirPath) {
    var stats = await fsPromises.stat(dirPath);
    return {
      folder: stats.isDirectory(),
      size: stats.size,
      mtime: stats.mtime.getTime()
    }    
}

module.exports = {
    init: function(_runtimeAPI) {
        runtimeAPI = _runtimeAPI
    },

    sheets: function (req, res) {
        let pathParam = req.params.path;
        // Path needs to be url encoded.
        if (pathParam) {
            pathParam = decodeURIComponent(pathParam);            
        }

        // Read sheet names from Excel file.
        const workbook = XLSX.readFile(pathParam, { bookSheets: true });

        // Typical workbook response will look like: {"SheetNames":["Simple Tax Forecast"]}
        res.json(workbook);
    },

    sheet: function (req, res) {
        let pathParam = req.params.path;
        let sheetParam = req.params.sheetId;
        // Path needs to be url encoded.
        if (pathParam) {
            pathParam = decodeURIComponent(pathParam);            
        }

        if (sheetParam) {
            sheetParam = decodeURIComponent(sheetParam);            
        }

        // Read sheet names from Excel file.
        const workbook = XLSX.readFile(pathParam);
        const worksheet = workbook.Sheets[sheetParam];
        if (!worksheet) {
            node.status({ fill: "red", shape: "circle", text: "Sheet does not exist: " + config.sheetname });
            node.error("Sheet does not exist: " + config.sheetname, msg.payload.msg);
            return;
        }
        let sheetHtml = XLSX.utils.sheet_to_html(worksheet, { header: '', footer: ''});
        res.send(sheetHtml);
    },

    browse: function (req, res) {
        let pathParam = req.params.path;
        // Path needs to be url encoded.
        if (pathParam) {
            pathParam = decodeURIComponent(pathParam);            
        }

        dialog.fileselect("Select message", "Select title", 3000, function(code, retVal, stderr) {
            if (retVal) {
                let returnPath = retVal.replace(/(\r\n|\n|\r)/gm, ""); // Get rid of trailing carriage returns.
                res.json({path: returnPath});
            } else {
                apiUtils.rejectHandler(req, res, stderr);
            }
        });
    },

    root: async function(req, res) {
        res.json({"path": HOME_DIR})
    },

    list: async function(req, res) {
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
              var stat = await getStats(fPath);
              stat.name = files[i];

              // We should filter everything except for folders and spreadsheets here.
              if (stat.folder === true || 
                  stat.folder === false && fPath.endsWith('.xlsx')) {
                stats.push(stat);  
              }
            }
          } catch (e) {
            log.info('Error reading file in directory: ' + dirPath);
            stats = [];
          }
        } catch (e) {
          log.info('Error reading directory: ' + dirPath);
          stats = [];
        }
        res.send(stats);   
    }

}


console.log('Start without ssl');

app.listen(1880, () => console.log('Server Demo listening on port 1880!'));