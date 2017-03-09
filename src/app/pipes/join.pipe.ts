import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(value: Array<any>, seperator: string=", "): string {
    return value.join(seperator);
  }

}
