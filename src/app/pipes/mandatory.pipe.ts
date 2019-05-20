import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mandatory'
})
export class MandatoryPipe implements PipeTransform {

  transform(value: string) {
    return `${value} *`;
  }

}