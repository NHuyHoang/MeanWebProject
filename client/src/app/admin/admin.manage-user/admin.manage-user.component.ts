import { Component, OnInit, AfterViewChecked, Inject } from '@angular/core';
import { PrivateUserService } from '../private-services/private-user.service';
declare var $:any;
@Component({
  selector: 'app-admin.manage-user',
  templateUrl: './admin.manage-user.component.html',
  styleUrls: ['./admin.manage-user.component.css']
})
export class AdManageUserComponent implements OnInit,AfterViewChecked {
  private users = [];
  private loaded = 0;
  private count = 0;
  constructor(@Inject(PrivateUserService) private prUserSv) {
    this.getUser();
    this.prUserSv.countUser().subscribe(result => this.count = result.count)
  }

  ngOnInit() {
  }

  ngAfterViewChecked(){
    if(this.users.length > 0){
      this.users.forEach(user => {  
        $(`#${user._id}`).rating({
          initialRating: user.point,
          maxRating: 5
        });

    })
    }
  }

  getUser(){
    //this.loaded = 0;
    this.prUserSv.getAll({skip:this.loaded}).subscribe(data => {
      this.loaded += data.length;
      this.users = this.users.concat(data);
      
      console.log(this.users);
    });
  }
}
