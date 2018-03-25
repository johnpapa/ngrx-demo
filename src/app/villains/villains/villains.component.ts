import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MasterDetailCommands, Villain } from '../../core';
import { VillainSelectors, VillainDispatchers } from '../../store';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VillainsComponent
  implements MasterDetailCommands<Villain>, OnInit {
  selected: Villain;
  commands = this;

  villains$: Observable<Villain[]>;
  loading$: Observable<boolean>;

  constructor(
    private villainDispatchers: VillainDispatchers,
    private villainSelectors: VillainSelectors
  ) {
    this.villains$ = this.villainSelectors.villains$;
    this.loading$ = this.villainSelectors.loading$;
  }

  ngOnInit() {
    this.getVillains();
  }

  close() {
    this.selected = null;
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  getVillains() {
    this.close();
    this.villainDispatchers.getVillains();
  }

  add(villain: Villain) {
    this.villainDispatchers.addVillain(villain);
  }

  delete(villain: Villain) {
    this.close();
    this.villainDispatchers.deleteVillain(villain);
  }

  update(villain: Villain) {
    this.villainDispatchers.updateVillain(villain);
  }

  select(villain: Villain) {
    this.selected = villain;
  }

  unselect() {
    this.selected = null;
  }
}
