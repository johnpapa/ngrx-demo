import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero, MasterDetailCommands } from '../../core';
import { HeroDispatchers, HeroSelectors } from '../../store';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent implements MasterDetailCommands<Hero>, OnInit {
  selected: Hero;
  commands = this;

  heroes$: Observable<Hero[]>;
  loading$: Observable<boolean>;

  constructor(
    private heroDispatchers: HeroDispatchers,
    private heroSelectors: HeroSelectors
  ) {
    this.heroes$ = this.heroSelectors.heroes$;
    this.loading$ = this.heroSelectors.loading$;
  }

  ngOnInit() {
    this.getHeroes();
  }

  close() {
    this.selected = null;
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  getHeroes() {
    this.close();
    this.heroDispatchers.getHeroes();
  }

  add(hero: Hero) {
    this.heroDispatchers.addHero(hero);
  }

  delete(hero: Hero) {
    this.close();
    this.heroDispatchers.deleteHero(hero);
  }

  update(hero: Hero) {
    this.heroDispatchers.updateHero(hero);
  }

  select(hero: Hero) {
    this.selected = hero;
  }

  unselect() {
    this.selected = null;
  }
}
