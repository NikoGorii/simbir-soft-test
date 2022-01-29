import { useContext } from 'react';

import { appContext } from '../utils/AppContext';

export function useAppContext() {
  return useContext(appContext);
}
