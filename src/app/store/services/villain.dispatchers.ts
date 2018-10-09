import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { EntityState } from '../reducers';
import { Villain } from '../../core';
import * as VillainAction from '../actions';

@Injectable()
export class VillainDispatchers {
  constructor(private store: Store<EntityState>) {}

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
