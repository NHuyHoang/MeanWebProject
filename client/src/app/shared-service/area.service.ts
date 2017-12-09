import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams, Headers, Response } from '@angular/http';
import { GLOBAL_VAR } from './shared-variable';



@Injectable()
export class AreaService {
  private GET_CHILD_AREA_URL = `${GLOBAL_VAR.APP_URL_PREFIX}area/getchildarea`;
  private GET_ALL_AREA_URL = `${GLOBAL_VAR.APP_URL_PREFIX}area/getall`;
  private body = new URLSearchParams();
  private header = new Headers();
  constructor(@Inject(Http) private http) {
    this.header.append('Content-Type', 'application/x-www-form-urlencoded');
   }

  getChildArea(id:string){
    this.body.set('id',id);
    return this.http.post(this.GET_CHILD_AREA_URL,this.body,{
      Headers:this.header
    }).map(
      (res:Response) => res.json()
    )
  }

  getAllAreas(){
    return this.http.get(this.GET_ALL_AREA_URL)
      .map((res:Response) => res.json())
  }

  

}
