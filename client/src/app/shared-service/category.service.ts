import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { GLOBAL_VAR } from './shared-variable';

@Injectable()
export class CategoryService {
  private GETAREA_API_URL = `${GLOBAL_VAR.APP_URL_PREFIX}cate/getbyid`;
  private header = new Headers();
  private body = new URLSearchParams();
  

  constructor(@Inject(Http) private http) {
    this.header.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  getAreaById(id:string){
    this.body.set('id',id);
    return this.http.post(this.GETAREA_API_URL,this.body,{
      headers:this.header
    }).map(
      (res:Response) => res.json()
    )
  }
}
