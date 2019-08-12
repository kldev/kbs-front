import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('userPanel');

export const setProfilePanelVisible = actionCreator<boolean>('setProfilePanelVisible');
export const setPasswordPanelVisible = actionCreator<boolean>('setPasswordPanelVisible');
