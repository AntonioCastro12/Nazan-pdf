import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'layoutFilterLightTheme',
})
export class LayoutFilterLightThemePipe implements PipeTransform {
  transform(values: any[], ...args: unknown[]): any[] {
    return values.filter((v) => v.darkTheme == false);
  }
}
