import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: '_truncate'
})

//The pipe which find and replace underscore with white space
export class UnderscoreTruncatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace('_',' ');
  }

}
