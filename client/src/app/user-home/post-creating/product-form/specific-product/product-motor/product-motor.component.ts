import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-motor',
  templateUrl: './product-motor.component.html',
  styleUrls: ['./product-motor.component.css']
})
export class ProductMotorComponent implements OnInit {
  @Input('specificInfo') specificInfo;
  constructor() { }

  ngOnInit() {
  }

}
