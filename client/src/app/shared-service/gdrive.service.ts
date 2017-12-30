import { Injectable, Inject } from '@angular/core';
import { Http,URLSearchParams,Headers,Response } from '@angular/http';
import { GLOBAL_VAR } from './shared-variable';

@Injectable()
export class GdriveService {
  private body = new URLSearchParams();
  private header = new Headers();
  private REMOVE_FILE_URL = `google/drive/remove`;

  constructor(@Inject(Http) private http) { }

  removeFile(idArray){
    return this.http.post(this.REMOVE_FILE_URL,JSON.stringify(idArray),{
      headers:{'Content-Type': 'application/json'}
    }).map(
      (res:Response) => res.json())
  }


}
