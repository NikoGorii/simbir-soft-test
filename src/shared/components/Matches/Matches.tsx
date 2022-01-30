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
import styles from '../Competitions/Competitions.module.scss';

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

export const Matches: VFC = () => {
  const { fetchService } = useAppContext();
  const params = useParams();

  const { data, isLoading } = useQuery(['matches', params.id], () =>
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
              <TableCell>Название лиги</TableCell>
              <TableCell>Дивизион</TableCell>
              <TableCell>Дата соревнования</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.matches.map((match) => (
              <TableRow key={match.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
