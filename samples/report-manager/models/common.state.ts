import {
  ListFavorites,
  ListHistoric,
} from '../../../src/app/layout/modules/home-manager/models/bookmarks.model';
import { Store } from './store.model';

export class CommonState {
  stores: Store[] = [];
  favorites: ListFavorites[] = [];
  historic: ListHistoric[] = [];
}
