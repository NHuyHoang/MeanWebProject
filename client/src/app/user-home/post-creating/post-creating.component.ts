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
  private category = [];
  constructor(
    private router: Router,
    @Inject(AreaService) private areaSV) {
    this.areaSV.getAllAreas().subscribe(data => {
      this.areas = data;
      
    })
    
  }

  ngOnInit() {
    this.formatProductsArr();
  }

  onNavigate() {
    this.router.navigate(['user'])
  }

  ngAfterViewInit() {
    $('.ui.dropdown').dropdown();

  }

  onNext() {
    let cateId = $('#category_selection').dropdown('get value');
    this.category = [];
    cateId.forEach(id => {
      let type;
      this.products.forEach(product => {
        if (product._id == id) {
          type = product.type;
          return;
        }
      })
      let obj = {
        _id: id,
        type: type,
        active: false
      }
      this.category.push(obj);
    })
    if(this.category[0] !== undefined)
      this.category[0].active = true;
    this.next = !this.next;
    window.scrollTo(0, 0);
  }

  onChangeArea(name) {
    this.areas.forEach(element => {
      if (element.name === name) {
        this.districts = element.subareas;
        return;
      }

    });
  }

  onToggleTab(tabId: string) {
    this.category.forEach(element => {
      if (tabId == element._id)
        element.active = true;
      else element.active = false;
    })
  }

  onDistrictChoice(id) {
  }

  formatProductsArr() {
    this.products = [];
    let value;
    for (let key in GLOBAL_VAR.PRODUCT_ID) {
      if(key === 'lease estate' || key === 'sale estate'){
        continue;
      }
      value = { "_id": GLOBAL_VAR.PRODUCT_ID[key], "type": key };
      this.products.push(value);
    }
    this.products.push( {_id:"est",type:"Estate"});
  }


}
