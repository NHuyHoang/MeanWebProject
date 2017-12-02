import { Inject } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';

import { Post } from '../../models/Posts';
import { Comment } from '../../models/Comments';
import { GLOBAL_VAR } from './shared-variable'
import { Response } from '@angular/http/src/static_response';
export class PostService {
  
  private USER_POST_URL = `${GLOBAL_VAR.APP_URL_PREFIX}post/getbyuserid`;
  private PUT_COMMENT_URL = `${GLOBAL_VAR.APP_URL_PREFIX}post/pushcmt`;
  private PUT_REPLY_URL = `${GLOBAL_VAR.APP_URL_PREFIX}post/pushrep`;
  private GET_BY_ID_URL = `${GLOBAL_VAR.APP_URL_PREFIX}post/getbyid`;
  private GET_ALL = `${GLOBAL_VAR.APP_URL_PREFIX}post/getall`;
  private header = new Headers();

  private body = new URLSearchParams();

  constructor(@Inject(Http) private http) { 
    this.header.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  formatPostList(list:any[]):Post[]{
    let postList:Post[] = [];
    list.forEach((p)=>{
      if(!p.hasOwnProperty("postcount")){
        let c:Comment[] = [];
        c = this.formatComment(p.comment);
        let post = new Post(p._id,p.vipexpire,p.date,p.title,p.subareaid,p.userpost,c,p.product,p.approval,p.available);
        postList.push(post);
      }
    })
    return postList;
  }

  private formatComment(cmtlist:any[]):Comment[]{
    if(cmtlist === undefined || cmtlist.length === 0) return [];
    let result:Comment[]=[];
    cmtlist.forEach((cmt) => {
      let c = new Comment(cmt._id,cmt.cmt,cmt.date,cmt.usercmt,this.formatComment(cmt.reply));
      result.push(c);
    })
    return result;
  }

  getUserPost(id:string,skip:string){
    this.body.set('id',id);
    this.body.set('skip',skip);
    return this.http.post(this.USER_POST_URL,this.body,{
      headers:this.header
    }).map(
      (res:Response) => res.json()
    )
  }

  getById(id:string){
    this.body.set('id',id);
    return this.http.post(this.GET_BY_ID_URL,this.body,{
      headers:this.header
    }).map(
      (res:Response) => res.json()
    )
  }

  getAll(skip:number){
    this.body.set('skip',skip.toString());
    return this.http.post(this.GET_ALL,this.body,{
      headers:this.header
    }).map(
      (res:Response) => res.json()
    )
  }
  pushCmt(cmt:any){
    return this.http.put(this.PUT_COMMENT_URL, JSON.stringify(cmt),{
      headers:{'Content-Type': 'application/json'}
    }).map(
      (res:Response) => res.json()
    )
  }

  pushRep(rep:any){
    return this.http.put(this.PUT_REPLY_URL, JSON.stringify(rep),{
      headers:{'Content-Type': 'application/json'}
    }).map(
      (res:Response) => res.json()
    )
  }
}
