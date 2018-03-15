export * from './actions';
export * from './effects';
export * from './reducers';
export * from './services';

import {
  HeroDispatchers,
  HeroDataService,
  HeroSelectors,
  VillainDispatchers,
  VillainDataService,
  VillainSelectors
} from './services';

export const services = [
  HeroDataService,
  HeroDispatchers,
  HeroSelectors,
  VillainDispatchers,
  VillainDataService,
  VillainSelectors
];
