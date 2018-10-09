import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Hero } from '../../core';
import * as HeroActions from '../actions';
import { EntityState } from '../reducers';
import { HeroDataService } from './hero-data.service';

const filterAction = new HeroActions.GetHeroes();
type HeroAction = HeroActions.HeroAction;

const loadingTrueAction = new HeroActions.SetHeroLoading(true);

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
        heroes => this.dispatch(new HeroActions.GetHeroesSuccess(heroes)),
        error => this.dispatch(new HeroActions.GetHeroesError(error))
      );
  }

  addHero(hero: Hero) {
    this.dispatchLoading();
    this.heroDataService.addHero(hero).subscribe(
      // pessimistic add: add hero to cache only when the server responds with success
      addedHero => this.dispatch(new HeroActions.AddHeroSuccess(addedHero)),
      error => this.dispatch(new HeroActions.AddHeroError(error))
    );
  }

  deleteHero(hero: Hero) {
    this.dispatchLoading();
    // optimistic delete: delete hero immediately from cache, before making request
    this.dispatch(new HeroActions.DeleteHero(hero));
    this.heroDataService.deleteHero(hero).subscribe(
      addedHero => this.dispatch(new HeroActions.DeleteHeroSuccess(addedHero)),
      // no recovery: don't bother restoring the hero to cache when server responds with error
      error => this.dispatch(new HeroActions.DeleteHeroError(error))
    );
  }

  updateHero(hero: Hero) {
    this.dispatchLoading();
    this.heroDataService.updateHero(hero).subscribe(
      // pessimistic update: update hero in cache only when the server responds with success
      addedHero => this.dispatch(new HeroActions.UpdateHeroSuccess(addedHero)),
      error => this.dispatch(new HeroActions.UpdateHeroError(error))
    );
  }

  constructor(
    private store: Store<EntityState>,
    private heroDataService: HeroDataService
  ) {}

  private dispatch = (action: Action) => this.store.dispatch(action);
  private dispatchLoading = () => this.dispatch(loadingTrueAction);
}
