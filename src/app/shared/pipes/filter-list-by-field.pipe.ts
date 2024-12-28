import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterListByField',
})
export class filterListByFieldPipe implements PipeTransform {
  transform(arrayBefore: any[], searchText: string): any[] {
    // || searchText.length < 3
    if (searchText === '') {
      return arrayBefore;
    }

    return arrayBefore.filter((item) => {
      const validOrder =
        item.Order_Id &&
        item.Order_Id.toLowerCase().includes(searchText.toLowerCase());
      const validDate =
        item.Order_Date &&
        item.Order_Date.toLowerCase().includes(searchText.toLowerCase());
      const validOrderStatus =
        item.Order_Status &&
        item.Order_Status.toLowerCase().includes(searchText.toLowerCase());
      const validItem =
        item.item_id &&
        item.item_id.toLowerCase().includes(searchText.toLowerCase());
      const validDescription =
        item.Description &&
        item.Description.toLowerCase().includes(searchText.toLowerCase());
      const validItemStatus =
        item.Item_Status &&
        item.Item_Status.toLowerCase().includes(searchText.toLowerCase());
      const validDays =
        item.dias_espera &&
        item.dias_espera.toLowerCase().includes(searchText.toLowerCase());

      return (
        validOrder ||
        validDate ||
        validOrderStatus ||
        validItem ||
        validDescription ||
        validItemStatus ||
        validDays
      );
    });

    return [];
  }
}
