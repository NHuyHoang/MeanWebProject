import { Component, OnInit, AfterViewInit } from '@angular/core';
declare let noUiSlider:any;
declare let $:any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, AfterViewInit {
  private nouislider;
  private range = {min:0,max:0}
  constructor() { 
    
  }
  
  ngAfterViewInit(){
    this.nouislider = noUiSlider();
    let slider = document.getElementById('slider');
    this.nouislider.create(slider, {
      start: [20, 80],
      connect: true,
      range: {
        'min': 0,
        'max': 100
      },
      tooltips:true,
      pips: {
        mode: 'values',
        values: [10,20,30, 80],
        density: 4
      }
    }); 
    $('.ui.dropdown').dropdown();
  }
  onShowRange(){
    let range = document.getElementsByClassName("noUi-tooltip");
    this.range.min = Number.parseFloat(range[0].textContent);
    this.range.max = Number.parseFloat(range[1].textContent);
    console.log(this.range);
  }

  ngOnInit() {
  }

}
