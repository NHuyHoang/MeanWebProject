import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AreaService, GLOBAL_VAR } from '../../shared-service/shared-service';
import { SpecProductService } from './product-form/specific-product/spec-product.service';
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder } from '@angular/forms';
import { Post } from '../../../models/Posts';
declare var $: any;


@Component({
  selector: 'app-post-creating',
  templateUrl: './post-creating.component.html',
  styleUrls: ['./post-creating.component.css']
})
export class PostCreatingComponent implements OnInit, AfterViewInit, AfterViewChecked {
  private next = false;
  private areas;
  private districts;
  private products = [];
  private category = [];
  private productForm;
  private productValue = {};
  private postForm;
  private categorySelect = [];
  constructor(
    private router: Router,
    @Inject(AreaService) private areaSV,
    @Inject(SpecProductService) private specProductSv,
    @Inject(FormBuilder) private formBuilder) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.postForm = formBuilder.group({
      'title': [],
      'subareaid': [],
      'userpost': [user._id]
    })
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
    //this.specProductSv.getProductForm();

  }

  ngAfterViewChecked() {
    if (Object.keys(this.specProductSv.getProductForm()).length !== 0) {
      this.productForm = this.specProductSv.getProductForm();
    }

    for (let k in this.productForm) {

      this.productForm[k].valueChanges.subscribe(value => {
        this.productValue[k] = value;
      });
    }

  }

  onNext() {
    //get type of product
    let cateId = $('#category_selection').dropdown('get value');
    if (cateId.length == 0) {
      this.category = [];
      this.productValue = {};
    }
    else if (cateId.length <= this.category.length) {
      let pos = 0;
      this.category.forEach((item, index, object) => {
        if (cateId.indexOf(item._id) == -1) {
          object.splice(index, 1);
        }
        console.log(item);
        delete this.productValue[item._id];
      })
    }
    cateId.forEach(id => {
      let type;
      let hadId = false;
      this.category.forEach(element => {
        if (element._id === id) {
          hadId = true;
          return;
        }
      })
      if (!hadId) {
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
      }
    })
    if (this.category[0] !== undefined)
      //this.category[0].active = true;
      this.onToggleTab(this.category[0]._id);
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
    this.postForm.controls['subareaid'].setValue(id);
  }

  formatProductsArr() {
    this.products = [];
    let value;
    for (let key in GLOBAL_VAR.PRODUCT_ID) {
      if (key === 'lease estate' || key === 'sale estate') {
        continue;
      }
      value = { "_id": GLOBAL_VAR.PRODUCT_ID[key], "type": key };
      this.products.push(value);
    }
    this.products.push({ _id: "est", type: "Estate" });
  }

  onSubmit() {
    console.log(this.productValue);
    let post = this.postForm.value;
    post.product = this.onFormatPost(this.productValue);
    post.date = new Date();
    post.vipexpire = post.date;
    post.comment = [];
    post.approval = false;
    post.available = false;
    //console.log(post);
  }

  onFormatPost(productArr: any) {
    let product = [];
    for (let key in productArr) {
      let obj = {};
        obj['_type'] = key;
        for (let k in productArr[key].generalInfo) {
          let p = productArr[key].generalInfo;
          obj[k] = p[k];
        }
        for (let k in productArr[key].specificInfo) {
          let p = productArr[key].specificInfo;
          obj[k] = p[k];
        }
    
      product.push(obj);
    }
    return product;
  }

}
