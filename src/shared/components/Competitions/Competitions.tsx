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
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../../hooks/useAppContext';
import { TableCellName } from '../TableCellName';

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
  plan: keyof typeof ECurrentSeasonNames;
  currentSeason?: CurrentSeason;
  numberOfAvailableSeasons: number;
  lastUpdated: Date;
}

export interface RootObject {
  count: number;
  filters: Filters;
  competitions: Competition[];
}

enum ECurrentSeasonNames {
  TIER_ONE = 'Первый',
  TIER_TWO = 'Второй',
  TIER_THREE = 'Третий',
  TIER_FOUR = 'Четвертый',
}

export const Competitions: VFC = () => {
  const { fetchService } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery('competitions', () =>
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название лиги</TableCell>
              <TableCell>Дивизион</TableCell>
              <TableCell>Дата соревнования</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.competitions
              .filter((competition) => ['WC'].includes(competition.code))
              .map((competition) => (
                <TableRow
                  hover
                  key={competition.id}
                  onClick={async () => {
                    try {
                      const resp = await queryClient.fetchQuery(
                        'competitionMatches',
                        () =>
                          fetchService.fetch(
                            `http://api.football-data.org/v2/competitions/${competition.id}/matches`,
                          ),
                      );
                      if ('errorCode' in resp) {
                        // eslint-disable-next-line no-console
                        console.warn('======?>', resp);
                      } else {
                        navigate(`/competitions/${competition.id}/matches`);
                      }
                    } catch (e) {
                      // eslint-disable-next-line no-console
                      console.warn(e);
                    }
                  }}
                >
                  <TableCell component="th" scope="row">
                    <TableCellName
                      name={competition.name}
                      url={competition.emblemUrl}
                    />
                  </TableCell>
                  <TableCell>
                    {competition.plan in ECurrentSeasonNames
                      ? ECurrentSeasonNames[competition.plan]
                      : competition.plan}
                  </TableCell>
                  <TableCell>
                    {!!competition.currentSeason?.startDate &&
                      format(
                        new Date(competition.currentSeason.startDate),
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
