import React from 'react';
import { useTranslation } from 'react-i18next';

export const Page404: React.FunctionComponent = () => {
  const i18n = useTranslation();

  return <h3>{i18n.t('error.page.not.found')}</h3>;
};
