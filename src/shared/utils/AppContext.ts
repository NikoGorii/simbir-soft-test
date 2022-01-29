import { createContext } from 'react';

import { IFetchService } from '../../services/FetchService/IFetchService';
import { FetchService } from '../../services/FetchService/implementations/FetchService';

export type AppContext = {
  fetchService: IFetchService;
};

export const appContext = createContext<AppContext>({
  fetchService: new FetchService(),
});

export const { Provider: AppContextProvider } = appContext;
