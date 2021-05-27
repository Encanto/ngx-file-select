import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {
  private readonly localAPI = 'http://localhost:1880/encanto'
  constructor(private http: HttpClient) { }

  public getFiles(path: string) {
    return this.http.get(this.localAPI + '/list/' + encodeURIComponent(path));
  }
}
