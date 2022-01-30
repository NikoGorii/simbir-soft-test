import { VFC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { FetchService } from '../../services/FetchService/implementations/FetchService';
import { Competitions } from '../../shared/components/Competitions';
import { Header } from '../../shared/components/Header';
import { Matches } from '../../shared/components/Matches';
import { Teams } from '../../shared/components/Teams';
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
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/">
            <Route path="competitions">
              <Route index element={<Competitions />} />
              <Route path=":id">
                <Route index element={<Navigate to="/competitions" />} />
                <Route element={<Matches />} path="matches" />
              </Route>
            </Route>
            <Route element={<Teams />} path="teams" />
            <Route element={<Matches />} path="matches" />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  </QueryClientProvider>
);
