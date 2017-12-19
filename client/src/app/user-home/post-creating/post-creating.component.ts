import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-creating',
  templateUrl: './post-creating.component.html',
  styleUrls: ['./post-creating.component.css']
})
export class PostCreatingComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onNavigate(){
    this.router.navigate(['user'])
  }
}
