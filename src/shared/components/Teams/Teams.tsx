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
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
              <TableRow
                hover
                key={team.id}
                onClick={async () => {
                  try {
                    const resp = await queryClient.fetchQuery('matches', () =>
                      fetchService.fetch(
                        `http://api.football-data.org/v2/teams/${team.id}/matches`,
                      ),
                    );
                    if ('errorCode' in resp) {
                      // eslint-disable-next-line no-console
                      console.warn('======?>', resp);
                    } else {
                      navigate(`/teams/${team.id}/matches`);
                    }
                  } catch (e) {
                    // eslint-disable-next-line no-console
                    console.warn(e);
                  }
                }}
              >
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
