import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})

//the pipe which will truncate text input and replace with ellipsis
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.substr(0, 13).lastIndexOf(' ');
    }
    return `${value.substr(0, limit)}${ellipsis}`;
  }

}
