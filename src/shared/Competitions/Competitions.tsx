import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import { ru } from 'date-fns/locale';
import { VFC } from 'react';
import { useQuery } from 'react-query';

import { useAppContext } from '../hooks/useAppContext';

import styles from './Competitions.module.scss';

export type Filters = Record<string, string>;

export interface Area {
  id: number;
  name: string;
  countryCode: string;
  ensignUrl: string;
}

export interface Winner {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
}

export interface CurrentSeason {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday?: number;
  winner: Winner;
}

export interface Competition {
  id: number;
  area: Area;
  name: string;
  code: string;
  emblemUrl: string;
  plan: string;
  currentSeason?: CurrentSeason;
  numberOfAvailableSeasons: number;
  lastUpdated: Date;
}

export interface RootObject {
  count: number;
  filters: Filters;
  competitions: Competition[];
}

export const Competitions: VFC = () => {
  const { fetchService } = useAppContext();

  const { data, isLoading } = useQuery('teams', () =>
    fetchService.fetch<RootObject>(
      'https://api.football-data.org/v2/competitions/',
    ),
  );

  if (isLoading) {
    return (
      <div className={styles.container}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="a dense table" size="small" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Current Season</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.competitions.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.plan}</TableCell>
                <TableCell>
                  {!!row.currentSeason?.startDate &&
                    format(
                      new Date(row.currentSeason.startDate),
                      'dd-MMM-yyyy',
                      { locale: ru },
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
