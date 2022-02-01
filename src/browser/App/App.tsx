import { VFC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { FetchService } from '../../services/FetchService/implementations/FetchService';
import { CompetitionMatches } from '../../shared/components/CompetitionMatches';
import { Competitions } from '../../shared/components/Competitions';
import { Header } from '../../shared/components/Header';
import { Teams } from '../../shared/components/Teams';
import { TeamsMatches } from '../../shared/components/TeamsMatches';
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
            <Route index element={<Navigate to="/competitions" />} />
            <Route path="competitions">
              <Route index element={<Competitions />} />
              <Route path=":id">
                <Route index element={<Navigate to="/competitions" />} />
                <Route element={<CompetitionMatches />} path="matches" />
              </Route>
            </Route>
            <Route path="teams">
              <Route index element={<Teams />} />
              <Route path=":id">
                <Route index element={<Navigate to="/teams" />} />
                <Route element={<TeamsMatches />} path="matches" />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  </QueryClientProvider>
);
