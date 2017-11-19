import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeFormatService {

  constructor() { }

  formatDate(date: Date){
    //let d = new Date(date);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }

  formatTime(date:Date){
    return date.getTime();
  }
}
