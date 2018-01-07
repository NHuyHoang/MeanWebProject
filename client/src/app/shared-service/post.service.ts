import { Inject } from '@angular/core';
import { Http,URLSearchParams, RequestOptions, Headers } from '@angular/http';

import { Post } from '../../models/Posts';
import { Comment } from '../../models/Comments';
import { GLOBAL_VAR } from './shared-variable'
import { Response } from '@angular/http/src/static_response';
export class PostService {
  private URL_PREFIX = `post/`;
  private USER_POST_URL = `${this.URL_PREFIX}getbyuserid`;
  private PUT_COMMENT_URL = `${this.URL_PREFIX}pushcmt`;
  private PUT_REPLY_URL = `${this.URL_PREFIX}pushrep`;
  private GET_BY_ID_URL = `${this.URL_PREFIX}getbyid`;
  private GET_ALL = `${this.URL_PREFIX}getall`;
  private GET_MINMAX_COST_URL = `${this.URL_PREFIX}getminmaxcost`;
  private GET_WITH_FILTER_URL = `${this.URL_PREFIX}getwithfilter`;
  private GET_POST_COUNT_URL = `${this.URL_PREFIX}getpostcount`;
  private SAVE_POST = `${this.URL_PREFIX}save`;
  private ACTIVATE_VIP = `${this.URL_PREFIX}activevip`;

  private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' })});
  private body = new URLSearchParams();

  constructor(@Inject(Http) private http) { 
  }
  //format post array
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
  //format comment and reply inside it
  private formatComment(cmtlist:any[]):Comment[]{
    if(cmtlist === undefined || cmtlist.length === 0) return [];
    let result:Comment[]=[];
    cmtlist.forEach((cmt) => {
      let c = new Comment(cmt._id,cmt.cmt,cmt.date,cmt.usercmt,this.formatComment(cmt.reply));
      result.push(c);
    })
    return result;
  }
  //get user's posts
  getUserPost(id:string,skip:string){
    this.body.set('id',id);
    this.body.set('skip',skip);
    
    return this.http.post(this.USER_POST_URL,this.body).map(
      (res:Response) => res.json()
    )
  }
  //get post by id
  getById(id:string){
    this.body.set('id',id);
    return this.http.post(this.GET_BY_ID_URL,this.body).map(
      (res:Response) => res.json()
    )
  }
  //get all posts
  getAll(skip:number){
    this.body.set('skip',skip.toString());
    return this.http.post(this.GET_ALL,this.body).map(
      (res:Response) => res.json()
    )
  }
  //save comment
  pushCmt(cmt:any){
    return this.http.post(this.PUT_COMMENT_URL, JSON.stringify(cmt),this.options).map(
      (res:Response) => res.json()
    )
  }
  //save the reply in post
  pushRep(rep:any){
    return this.http.post(this.PUT_REPLY_URL, JSON.stringify(rep),this.options).map(
      (res:Response) => res.json()
    )
  }
  //get min max cost of all post's product
  getMinMaxCost(){
    return this.http.get(this.GET_MINMAX_COST_URL)
      .map((res:Response) => res.json())
  }

  getWithFilter(filter:any){
    return this.http.post(this.GET_WITH_FILTER_URL, JSON.stringify(filter),this.options).map(
      (res:Response) => res.json()
    )
  }

  getPostCount(id){
    this.body.set('id',id);
    return this.http.post(this.GET_POST_COUNT_URL,this.body).map(
      (res:Response) =>  res.json()
    )
  }

  save(post){
    return this.http.post(this.SAVE_POST,JSON.stringify(post),this.options).map(
      (res:Response) => res.json()
    )
  }

  activateVip(obj){
    return this.http.post(this.ACTIVATE_VIP,JSON.stringify(obj),this.options).map(
      (res:Response) => res.json()
    )
  }
}
