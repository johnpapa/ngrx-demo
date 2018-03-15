import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Villain } from '../../core';
import * as VillainAction from '../actions';
import { HeroicState } from '../reducers';

@Injectable()
export class VillainDispatchers {
  constructor(private store: Store<HeroicState>) {}

  deleteVillain(villain: Villain) {
    this.store.dispatch(new VillainAction.DeleteVillain(villain));
  }

  addVillain(villain: Villain) {
    this.store.dispatch(new VillainAction.AddVillain(villain));
  }

  updateVillain(villain: Villain) {
    this.store.dispatch(new VillainAction.UpdateVillain(villain));
  }

  getVillains() {
    this.store.dispatch(new VillainAction.GetVillains());
  }
}
