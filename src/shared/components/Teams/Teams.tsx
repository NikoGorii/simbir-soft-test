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
import { VFC } from 'react';
import { useQuery } from 'react-query';

import { useAppContext } from '../../hooks/useAppContext';
import { TableCellName } from '../TableCellName';

import styles from './Teams.scss';

export interface Filters {
  areas: number[];
  permission: string;
}

export interface Area {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  area: Area;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  founded?: number;
  clubColors: string;
  venue: string;
  lastUpdated: Date;
}

export interface RootObject {
  count: number;
  filters: Filters;
  teams: Team[];
}

export const Teams: VFC = () => {
  const { fetchService } = useAppContext();

  const { data, isLoading } = useQuery('teams', () =>
    fetchService.fetch<RootObject>('https://api.football-data.org/v2/teams/'),
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название команды</TableCell>
              <TableCell>Адрес</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell component="th" scope="row">
                  <TableCellName reverse name={team.name} url={team.crestUrl} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {team.address}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
