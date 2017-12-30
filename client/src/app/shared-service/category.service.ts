import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams,  } from '@angular/http';
import { GLOBAL_VAR } from './shared-variable';

@Injectable()
export class CategoryService {
  private GETAREA_API_URL = `cate/getbyid`;
  private body = new URLSearchParams();

  

  constructor(@Inject(Http) private http) {
  }

  getAreaById(id:string){
    this.body.set('id',id);
    return this.http.post(this.GETAREA_API_URL,this.body).map(
      (res:Response) => res.json()
    )
  }
}
