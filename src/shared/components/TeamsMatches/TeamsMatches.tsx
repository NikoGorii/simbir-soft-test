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

import styles from './TeamsMatches.module.scss';

export type Filters = Record<string, string>;

export interface Area {
  id: number;
  name: string;
}

export interface Competition {
  id: number;
  area: Area;
  name: string;
  code: string;
  plan: string;
  lastUpdated: Date;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
}

export interface Odds {
  msg: string;
}

export interface FullTime {
  homeTeam: number;
  awayTeam: number;
}

export interface HalfTime {
  homeTeam: number;
  awayTeam: number;
}

export interface ExtraTime {
  homeTeam?: number;
  awayTeam?: number;
}

export interface Penalties {
  homeTeam?: number;
  awayTeam?: number;
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

export interface Referee {
  id: number;
  name: string;
  role: string;
  nationality: string;
}

export interface Match {
  id: number;
  season: Season;
  utcDate: Date;
  status: string;
  matchday?: number;
  stage: string;
  group: string;
  lastUpdated: Date;
  odds: Odds;
  score: Score;
  homeTeam: HomeTeam;
  awayTeam: AwayTeam;
  referees: Referee[];
}

export interface RootObject {
  count: number;
  filters: Filters;
  competition: Competition;
  matches: Match[];
}

export const TeamsMatches: VFC = () => {
  const { fetchService } = useAppContext();
  const params = useParams();

  const { data, isLoading } = useQuery(['teamsMatches', params.id], () =>
    fetchService.fetch<RootObject>(
      `http://api.football-data.org/v2/teams/${params.id}/matches`,
    ),
  );

  if (isLoading) {
    return (
      <div className={styles.container}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
  // eslint-disable-next-line no-console
  console.warn(data);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Команды участники</TableCell>
              <TableCell>Дата соревнования</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.matches.map((match) => (
              <TableRow key={match.id}>
                <TableCell>
                  <div className={styles.score}>
                    <div>{match.homeTeam.name}</div>&nbsp;:&nbsp;
                    <div>{match.awayTeam.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {/* дата со временем, поэтому не удаётся локализовать ? */}
                  {match.utcDate}
                  {/* {!!match.utcDate?.startDate &&
                    format(new Date(match.utcDate.startDate), 'dd-MMM-yyyy', {
                      locale: ru,
                    })} */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
