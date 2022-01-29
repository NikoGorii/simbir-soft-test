import { VFC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { FetchService } from '../../services/FetchService/implementations/FetchService';
import { Competitions } from '../../shared/Competitions';
import { AppContextProvider } from '../../shared/utils/AppContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const App: VFC = () => (
  <QueryClientProvider client={queryClient}>
    <AppContextProvider
      value={{
        fetchService: new FetchService(),
      }}
    >
      <Competitions />
    </AppContextProvider>
  </QueryClientProvider>
);
