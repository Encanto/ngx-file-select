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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { encode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {
  private readonly localAPI = 'http://localhost:1880/encanto'
  constructor(private http: HttpClient) { }

  public getFiles(path: string, filter: string) {
    return this.http.get(this.localAPI + '/list/' + encodeURIComponent(path) + '?filter=' + encodeURIComponent(filter));
  }

  public getRoot() {
    return this.http.get(this.localAPI + '/root/');
  }
}
