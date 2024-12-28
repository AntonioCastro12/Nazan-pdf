import { OptionsEntity } from "./options.entity";

export class OptionsState {
  OptionsEntity: OptionsEntity = { onChart: false, onDownload: false, onRefresh: false, onSearch: false, onShow: false, onFavorite: false };
}
