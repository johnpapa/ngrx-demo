import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Hero } from '../../core';
import * as HeroAction from '../actions';
import { HeroicState } from '../reducers';

@Injectable()
export class HeroDispatchers {
  constructor(private store: Store<HeroicState>) {}

  deleteHero(hero: Hero) {
    this.store.dispatch(new HeroAction.DeleteHero(hero));
  }

  addHero(hero: Hero) {
    this.store.dispatch(new HeroAction.AddHero(hero));
  }

  updateHero(hero: Hero) {
    this.store.dispatch(new HeroAction.UpdateHero(hero));
  }

  getHeroes() {
    this.store.dispatch(new HeroAction.GetHeroes());
  }
}
