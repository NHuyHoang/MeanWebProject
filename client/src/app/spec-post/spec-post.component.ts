import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router'
import { User } from '../../models/User';
import { Post } from '../../models/Posts';
import { PostService} from '../shared-service/shared-service';
import { Subscription } from 'rxjs/Subscription';
declare let $:any

@Component({
  selector: 'app-spec-post',
  templateUrl: './spec-post.component.html',
  styleUrls: ['./spec-post.component.css']
})
export class SpecPostComponent implements OnInit, OnDestroy {
  private user = new User();
  private post = new Post();
  private subscription:Subscription;
  private postId;
  constructor(
    @Inject(ActivatedRoute)private atvRoute,
    @Inject(PostService) private postservice,
    @Inject(Router) private router) 
    {
    window.scrollTo(0,0);                                           //scroll to top of the page 
    this.subscription = atvRoute.params.subscribe((param:any)=>{
      this.postId = param['_id'];
      this.postservice.getById(this.postId).subscribe((data)=>{       //get the post by the id
        let postholder = [];
        postholder.push(data);
        this.post = this.postservice.formatPostList(postholder)[0];   //format posts 
        this.user = data.userpost;
        //sematic-ui rating jquery for display user point
        $('.rating')
        .rating({
          initialRating: this.user.point,
          maxRating: 5,
        });
      })
    })
    
   }

  onNavigateUserHome(){
    this.router.navigate(['visit',this.user._id]);
  }

  ngOnInit() {

  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
