import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], term: string): any {
    // I am unsure what id is here. did you mean title?
    return items.filter((item) => item.group.indexOf(term) !== -1);
  }
}
