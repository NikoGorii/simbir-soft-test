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
import { useParams } from 'react-router-dom';

import { useAppContext } from '../../hooks/useAppContext';

import styles from './CompetitionMatches.module.scss';

export interface Filters {
  dateFrom: string;
  dateTo: string;
  permission: string;
}

export interface Area {
  name: string;
  code: string;
  ensignUrl: string;
}

export interface Competition {
  id: number;
  name: string;
  area: Area;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner?: any;
}

export interface Odds {
  msg: string;
}

export interface FullTime {
  homeTeam?: number;
  awayTeam?: number;
}

export interface HalfTime {
  homeTeam?: number;
  awayTeam?: number;
}

export interface ExtraTime {
  homeTeam?: any;
  awayTeam?: any;
}

export interface Penalties {
  homeTeam?: any;
  awayTeam?: any;
}

export interface Score {
  winner: string;
  duration: string;
  fullTime: FullTime;
  halfTime: HalfTime;
  extraTime: ExtraTime;
  penalties: Penalties;
}

export interface HomeTeam {
  id: number;
  name: string;
}

export interface AwayTeam {
  id: number;
  name: string;
}

export interface Match {
  id: number;
  competition: Competition;
  season: Season;
  utcDate: Date;
  status: string;
  matchday: number;
  stage: string;
  group?: any;
  lastUpdated: Date;
  odds: Odds;
  score: Score;
  homeTeam: HomeTeam;
  awayTeam: AwayTeam;
  referees: any[];
}

export interface RootObject {
  count: number;
  filters: Filters;
  matches: Match[];
}

export const CompetitionMatches: VFC = () => {
  const { fetchService } = useAppContext();
  const params = useParams();

  const { data, isLoading } = useQuery(['competitionMatches', params.id], () =>
    fetchService.fetch<RootObject>(
      `http://api.football-data.org/v2/competitions/${params.id}/matches`,
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
              <TableCell>Счёт</TableCell>
              <TableCell>Команды участники</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.matches.map((match) => (
              <TableRow key={match.id}>
                <TableCell component="th" scope="row">
                  <div className={styles.score}>
                    <div>{match.score.fullTime.awayTeam}</div>&nbsp;:&nbsp;
                    <div>{match.score.fullTime.homeTeam}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={styles.score}>
                    <div>{match.homeTeam.name}</div>&nbsp;:&nbsp;
                    <div>{match.awayTeam.name}</div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
