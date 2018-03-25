export * from './actions';
export * from './effects';
export * from './reducers';
export * from './services';

import {
  HeroDispatchers, HeroHttpDispatchers,
  HeroDataService,
  HeroSelectors,
  VillainDispatchers,
  VillainDataService,
  VillainSelectors
} from './services';

export const services = [
  HeroDataService,
  HeroDispatchers, HeroHttpDispatchers,
  HeroSelectors,
  VillainDispatchers,
  VillainDataService,
  VillainSelectors
];
