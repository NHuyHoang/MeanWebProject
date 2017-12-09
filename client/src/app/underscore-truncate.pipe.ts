import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: '_truncate'
})
export class UnderscoreTruncatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace('_',' ');
  }

}
