import { SalesmanListItem } from 'api/types';
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('userPanel');

export const listSuccess = actionCreator<SalesmanListItem[]>('listSuccess');
