import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OptionsState } from './options.state';

@Injectable({
  providedIn: 'root'
})
export class OptionsStateService {
  private subject = new BehaviorSubject<OptionsState>(new OptionsState());
  public readonly state = this.subject.asObservable();

  optionsState = new OptionsState();

  constructor() {
    this.state.subscribe((state) => (this.optionsState = state));
  }

  initState() {
    this.optionsState.OptionsEntity = { onChart: false, onDownload: false, onRefresh: false, onSearch: false, onShow: false, onFavorite: false }
  }
  setSearch() {
    this.optionsState.OptionsEntity.onSearch = !this.optionsState.OptionsEntity.onSearch;
    console.log(this.optionsState.OptionsEntity.onSearch)
    this.subject.next(this.optionsState);
  }
  setRefresh() {
    this.optionsState.OptionsEntity.onRefresh = !this.optionsState.OptionsEntity.onRefresh;
    this.subject.next(this.optionsState);
  }
  setDownload() {
    this.optionsState.OptionsEntity.onDownload = !this.optionsState.OptionsEntity.onDownload;
    this.subject.next(this.optionsState);
  }

  setChart() {
    this.optionsState.OptionsEntity.onChart = !this.optionsState.OptionsEntity.onChart;
    this.subject.next(this.optionsState);
  }

  setFavorite() {
    this.optionsState.OptionsEntity.onFavorite = !this.optionsState.OptionsEntity.onFavorite;
    this.subject.next(this.optionsState);
  }
}
