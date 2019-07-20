import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Hero } from '../../core';
import * as HeroAction from '../actions';
import { EntityState } from '../reducers';

@Injectable()
export class HeroDispatchers {
  constructor(private store: Store<EntityState>) {}

  deleteHero(hero: Hero) {
    this.store.dispatch(HeroAction.deleteHero({ hero }));
  }

  addHero(hero: Hero) {
    this.store.dispatch(HeroAction.addHero({ hero }));
  }

  updateHero(hero: Hero) {
    this.store.dispatch(HeroAction.updateHero({ hero }));
  }

  getHeroes() {
    this.store.dispatch(HeroAction.getHeroes());
  }
}
