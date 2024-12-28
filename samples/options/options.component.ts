import { Component, Input } from '@angular/core';
import { OptionsStateService } from './models/options-state.service';
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  @Input() showRefresh: boolean = false;
  @Input() showSearch: boolean = false;
  @Input() showChart: boolean = false;
  @Input() showEye: boolean = false;
  @Input() showDownload: boolean = false;
  @Input() showFavorite: boolean = false;

  constructor(public optionServices: OptionsStateService) { }

  handleSearch() {
    console.log('LLEGA AL BUSCAR')
    this.optionServices.setSearch();
  }

  handleChart() {
    this.optionServices.setChart();
  }

  handleRefresh() {
    this.optionServices.setRefresh();
  }

  handleDownload() {
    this.optionServices.setDownload();
  }

  handleFavorite() {
    this.optionServices.setFavorite();
  }
}
