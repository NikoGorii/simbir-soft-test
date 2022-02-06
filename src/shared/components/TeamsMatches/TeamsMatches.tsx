import { Table } from 'antd';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { VFC } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { useAppContext } from '../../hooks/useAppContext';

import styles from './TeamsMatches.module.scss';
import { Team } from './types/Team';
import { TeamMatches } from './types/TeamMatches';
// import { TableCellSpace } from '../TableCellSpace';
export const TeamsMatches: VFC = () => {
  const { fetchService } = useAppContext();
  const params = useParams();

  const { data, isLoading } = useQuery(['teamsMatches', params.id], () =>
    fetchService.fetch<TeamMatches>(
      `http://api.football-data.org/v2/teams/${params.id}/matches`,
    ),
  );

  const { data: dataTeam } = useQuery(['team', params.id], () =>
    fetchService.fetch<Team>(
      `http://api.football-data.org/v2/teams/${params.id}`,
    ),
  );
  return (
    <div>
      <h4 className={styles.title}>{dataTeam?.name}</h4>
      <Table
        columns={[
          {
            dataIndex: 'awayTeam',
            filterSearch: true,
            filters: data?.matches.map(
              (match): ColumnFilterItem => ({
                text: match.awayTeam.name,
                value: match.awayTeam.name,
              }),
            ),
            key: 'awayTeam',
            onFilter: (value, record) =>
              record.awayTeam.startsWith(value as string),
            sorter: (a, b) => {
              if (a.awayTeam < b.awayTeam) {
                return -1;
              }
              if (a.awayTeam > b.awayTeam) {
                return 1;
              }

              return 0;
            },
            title: 'Гостевая команда',
          },
          {
            dataIndex: 'utcDate',
            key: 'utcDate',
            title: 'Дата матча',
          },
          {
            dataIndex: 'homeTeam',
            filterSearch: true,
            filters: data?.matches.map(
              (match): ColumnFilterItem => ({
                text: match.homeTeam.name,
                value: match.homeTeam.name,
              }),
            ),
            key: 'homeTeam',
            onFilter: (value, record) =>
              record.homeTeam.startsWith(value as string),
            sorter: (a, b) => {
              if (a.homeTeam < b.homeTeam) {
                return -1;
              }
              if (a.homeTeam > b.homeTeam) {
                return 1;
              }

              return 0;
            },
            title: 'Домашняя команда',
          },
        ]}
        dataSource={data?.matches.reduce((accumulator, match) => {
          accumulator.push({
            awayTeam: match.awayTeam.name,
            homeTeam: match.homeTeam.name,
            key: match.id,
            utcDate: match.utcDate,
          });

          return accumulator;
        }, Array.of<{ key: number; homeTeam: string; awayTeam: string; utcDate: Date }>())}
        loading={isLoading}
      />
    </div>
  );
};
