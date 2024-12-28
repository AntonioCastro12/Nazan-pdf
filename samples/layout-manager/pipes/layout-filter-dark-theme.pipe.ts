import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'layoutFilterDarkTheme',
})
export class LayoutFilterDarkThemePipe implements PipeTransform {
  transform(values: any[], ...args: unknown[]): any[] {
    return values.filter((v) => v.darkTheme == true);
  }
}
