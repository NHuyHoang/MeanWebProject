import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-camera',
  templateUrl: './product-camera.component.html',
  styleUrls: ['./product-camera.component.css']
})
export class ProductCameraComponent implements OnInit {
  @Input('specificInfo') specificInfo;
  constructor() { }

  ngOnInit() {
  }

}
