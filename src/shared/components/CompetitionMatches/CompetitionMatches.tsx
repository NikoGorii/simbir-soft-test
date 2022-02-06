import { Table } from 'antd';
import { VFC } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { useAppContext } from '../../hooks/useAppContext';
import { TableCellSpace } from '../TableCellSpace';

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

  return (
    <Table
      columns={[
        {
          dataIndex: 'score',
          key: 'score',
          render(score: Score) {
            if (
              score.fullTime.awayTeam == null ||
              score.fullTime.homeTeam == null
            ) {
              return null;
            }

            return (
              <TableCellSpace
                left={score.fullTime.awayTeam.toString()}
                right={score.fullTime.homeTeam.toString()}
              />
            );
          },
          title: 'Счёт',
        },
        {
          dataIndex: 'name',
          key: 'name',
          render({ awayTeam, homeTeam }) {
            if (awayTeam == null || homeTeam == null) {
              return null;
            }

            return (
              <TableCellSpace left={awayTeam.name} right={homeTeam.name} />
            );
          },
          title: 'Команды участники',
        },
      ]}
      dataSource={data?.matches.map((match) => ({
        key: match.id,
        name: {
          awayTeam: match.awayTeam,
          homeTeam: match.homeTeam,
        },
        score: match.score,
      }))}
      loading={isLoading}
    />
  );
  //   return (
  //     <div>
  //       <TableContainer component={Paper}>
  //         <Table>
  //           <TableHead>
  //             <TableRow>
  //               <TableCell>Счёт</TableCell>
  //               <TableCell>Команды участники</TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {data?.matches.map((match) => (
  //               <TableRow key={match.id}>
  //                 <TableCell component="th" scope="row">
  //                   {match.score.fullTime.awayTeam != null &&
  //                     match.score.fullTime.homeTeam != null && (
  //                       <TableCellSpace
  //                         left={match.score.fullTime.awayTeam.toString()}
  //                         right={match.score.fullTime.homeTeam.toString()}
  //                       />
  //                     )}
  //                 </TableCell>
  //                 <TableCell>
  //                   <TableCellSpace
  //                     left={match.homeTeam.name}
  //                     right={match.awayTeam.name}
  //                   />
  //                 </TableCell>
  //               </TableRow>
  //             ))}
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //     </div>
  //   );
};
