import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Villain } from '../../core';
import * as VillainAction from '../actions';
import { EntityState } from '../reducers';

@Injectable()
export class VillainDispatchers {
  constructor(private store: Store<EntityState>) {}

  deleteVillain(villain: Villain) {
    this.store.dispatch(VillainAction.deleteVillain({ villain }));
  }

  addVillain(villain: Villain) {
    this.store.dispatch(VillainAction.addVillain({ villain }));
  }

  updateVillain(villain: Villain) {
    this.store.dispatch(VillainAction.updateVillain({ villain }));
  }

  getVillains() {
    this.store.dispatch(VillainAction.getVillains());
  }
}
