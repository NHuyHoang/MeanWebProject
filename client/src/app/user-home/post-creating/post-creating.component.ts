import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AreaService, GLOBAL_VAR, PostService } from '../../shared-service/shared-service';
import { SpecProductService } from './product-form/specific-product/spec-product.service';
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder } from '@angular/forms';
import { Post } from '../../../models/Posts';
import { BehaviorSubject } from 'rxjs';
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
  private postForm;
  private categorySelect = [];
  private invalidForm = new BehaviorSubject<boolean>(false);
  private loaded = false
  private postUrl;

  constructor(
    private router: Router,
    @Inject(AreaService) private areaSV,
    @Inject(SpecProductService) private specProductSv,
    @Inject(FormBuilder) private formBuilder,
    @Inject(PostService) private postSv) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.postForm = formBuilder.group({
      'title': [],
      'subareaid': [],
      'userpost': [user._id]
    })
    this.areaSV.getAllAreas().subscribe(data => {
      this.areas = data;
    })
    $('.ui.basic.modal')
      .modal('show')
      ;
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

    for (let key in this.productForm) {

      this.productForm[key]
        .statusChanges.subscribe(status => {
          if (status == "INVALID")
            this.invalidForm.next(true);
          else this.invalidForm.next(false);
        })
    }
  }

  onCheckValidPost() {
    for (let key in this.productForm) {
      if (this.productForm[key].controls['generalInfo'].invalid)
        return false;
    }
    return true
  }

  onNext() {
    this.onConfigCategory();
    this.next = !this.next;
    window.scrollTo(0, 0);
  }

  onBack() {
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
    let post = this.postForm.value;
    let productValue = {};
    for (let key in this.productForm) {
      productValue[key] = this.productForm[key].value;
    }
    post.product = this.onFormatPost(productValue);
    post.date = new Date();
    post.vipexpire = post.date;
    post.comment = [];
    post.approval = false;
    post.available = false;
    console.log(JSON.stringify(post));
    this.postSv.save(post).subscribe(result => {
      if (result) this.loaded = true;
      this.postUrl = `post/${result._id}`;
      $('.ui.basic.modal')
      .modal('show')
      ;
    });
  }

  onNavigatePost(){
    this.router.navigate([this.postUrl]);
  }

  onFormatPost(productArr: any) {
    //format product
    let product = [];
    //foreach product
    for (let key in productArr) {
      let obj = {};
      //add general and specific information to the product
      for (let k in productArr[key].generalInfo) {
        let p = productArr[key].generalInfo;
        obj[k] = p[k];
      }
      //estate's specific information is different from another product
      if (key == "est") {
        let p = productArr[key].specificInfo;
        for (let k in p) {
          if (k == "salecontract" || k == "leasecontract") {
            if (this.productForm['est'].controls['specificInfo'].controls[k].invalid)
              continue;
          }
          obj[k] = p[k];
        }
      }
      else {
        obj['_type'] = key;
        for (let k in productArr[key].specificInfo) {
          let p = productArr[key].specificInfo;
          obj[k] = p[k];
        }
      }
      product.push(obj);
    }
    return product;
  }

  onConfigCategory() {
    //prepare form of product before click next step
    let cateId = $('#category_selection').dropdown('get value');
    if (cateId.length == 0) {
      this.category = [];
      return;
    }
    let save = [];
    let temp = []
    this.category.forEach((item, index, object) => {
      if (cateId.indexOf(item._id) == -1) {
        //delete this.productValue[item._id];
      }
      else {
        save.push(item._id);
        temp.push(item);
      }
    })
    this.category = temp;
    cateId.forEach(id => {
      if (save.indexOf(id) == -1) {
        let obj = {
          _id: id,
          type: this.getProductType(id),
          active: false
        }
        this.category.push(obj);
      }

    })
    if (this.category[0] !== undefined)
      this.onToggleTab(this.category[0]._id);
  }

  getProductType(id) {
    let value;
    this.products.forEach(item => {
      if (item._id == id) {
        value = item.type;
        return;
      }
    })
    return value;
  }

}
