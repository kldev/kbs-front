import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('nav');

export const toggleFilter = actionCreator('toggleFilter');
export const setFilterVisibility = actionCreator<boolean>('setFilterVisibility');
