import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simpleFormat'
})
export class SimpleFormatPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value.replace(/\n/g,"<br>");
  }

}
