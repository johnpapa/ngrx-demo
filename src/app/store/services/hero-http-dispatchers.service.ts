import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Hero } from '../../core';
import * as HeroActions from '../actions';
import { EntityState } from '../reducers';
import { HeroDataService } from './hero-data.service';

/**
 * Make HTTP calls for Heroes
 * dispatch the results (success or error) to ngrx store.
 */
@Injectable()
export class HeroHttpDispatchers {
  getHeroes() {
    this.dispatchLoading();
    this.heroDataService
      .getHeroes()
      .subscribe(
        heroes => this.dispatch(HeroActions.getHeroesSuccess({ heroes })),
        error => this.dispatch(HeroActions.getHeroesError(error))
      );
  }

  addHero(hero: Hero) {
    this.dispatchLoading();
    this.heroDataService.addHero(hero).subscribe(
      // pessimistic add: add hero to cache only when the server responds with success
      addedHero =>
        this.dispatch(HeroActions.addHeroSuccess({ hero: addedHero })),
      error => this.dispatch(HeroActions.addHeroError(error))
    );
  }

  deleteHero(hero: Hero) {
    this.dispatchLoading();
    // optimistic delete: delete hero immediately from cache, before making request
    this.dispatch(HeroActions.deleteHero({ hero }));
    this.heroDataService.deleteHero(hero).subscribe(
      addedHero =>
        this.dispatch(HeroActions.deleteHeroSuccess({ hero: addedHero })),
      // no recovery: don't bother restoring the hero to cache when server responds with error
      error => this.dispatch(HeroActions.deleteHeroError(error))
    );
  }

  updateHero(hero: Hero) {
    this.dispatchLoading();
    this.heroDataService.updateHero(hero).subscribe(
      // pessimistic update: update hero in cache only when the server responds with success
      addedHero =>
        this.dispatch(HeroActions.updateHeroSuccess({ hero: addedHero })),
      error => this.dispatch(HeroActions.updateHeroError(error))
    );
  }

  constructor(
    private store: Store<EntityState>,
    private heroDataService: HeroDataService
  ) {}

  private dispatch = (action: Action) => this.store.dispatch(action);
  private dispatchLoading = () =>
    this.dispatch(HeroActions.setHeroLoading({ loading: true }));
}
