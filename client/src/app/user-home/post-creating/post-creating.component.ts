import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AreaService, GLOBAL_VAR } from '../../shared-service/shared-service';
declare var $: any;


@Component({
  selector: 'app-post-creating',
  templateUrl: './post-creating.component.html',
  styleUrls: ['./post-creating.component.css']
})
export class PostCreatingComponent implements OnInit, AfterViewInit {
  private next = false;
  private areas;
  private districts;
  private products = [];
  constructor(
    private router: Router,
    @Inject(AreaService) private areaSV) {
    this.areaSV.getAllAreas().subscribe(data => {
      this.areas = data;
      
    })
    this.formatProductsArr();
  }

  ngOnInit() {
  }

  onNavigate() {
    this.router.navigate(['user'])
  }

  ngAfterViewInit() {
    $('.ui.dropdown').dropdown({
    });

  }

  onNext() {
   console.log($('#category_selection').dropdown('get value'));
   this.next = true;
  }

  onChangeArea(name) {
   this.areas.forEach(element => {
     if(element.name === name)
      {
        this.districts = element.subareas;
        return;
      }

   });
  } 

  onDistrictChoice(id){    
  }

  formatProductsArr() {
    for (let key in GLOBAL_VAR.PRODUCT_ID) {
      let value = { "_id": GLOBAL_VAR.PRODUCT_ID[key], "type": key };
      this.products.push(value);
    }
  }
}
