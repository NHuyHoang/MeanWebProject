import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-laptop',
  templateUrl: './product-laptop.component.html',
  styleUrls: ['./product-laptop.component.css']
})
export class ProductLaptopComponent implements OnInit {
  @Input('specificInfo') specificInfo;
  constructor() { }

  ngOnInit() {
  }

}
