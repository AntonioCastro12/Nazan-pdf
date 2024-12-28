import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterListByFieldDays',
})
export class filterListByFieldDaysPipe implements PipeTransform {
  transform(arrayBefore: any[], searchText: string): any[] {
    if (searchText === '') {
      return arrayBefore;
    }

    return arrayBefore.filter((item) => {
      const validDays =
        item.dias_espera &&
        item.dias_espera.toLowerCase().includes(searchText.toLowerCase());

      return validDays;
    });

    return [];
  }
}
