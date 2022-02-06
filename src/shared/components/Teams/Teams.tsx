import { Table } from 'antd';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { VFC } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../../hooks/useAppContext';

import styles from './Teams.module.scss';

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

  const { data, isLoading } = useQuery('teams', () =>
    fetchService.fetch<RootObject>('https://api.football-data.org/v2/teams/'),
  );

  const handleRowClick = (id: number) => () => {
    navigate(`/teams/${id}/matches`);
  };
  return (
    <Table
      columns={[
        {
          dataIndex: 'name',
          filterSearch: true,
          filters: data?.teams.map(
            (team): ColumnFilterItem => ({
              text: team.name,
              value: team.name,
            }),
          ),
          key: 'name',
          onFilter: (value, record) => record.name.startsWith(value as string),
          sorter: (a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }

            return 0;
          },
          title: 'Название команды',
        },
        {
          dataIndex: 'crestUrl',
          key: 'crestUrl',
          render: (_text, record) => (
            <img alt="logo-team" height="50px" src={record.url} width="50px" />
          ),
          title: 'Логотип команды',
        },
        {
          dataIndex: 'area',
          key: 'area',
          showSorterTooltip: {
            title: 'Для сортировки нажать',
          },
          sorter: (a, b) => {
            if (a.area < b.area) {
              return -1;
            }
            if (a.area > b.area) {
              return 1;
            }

            return 0;
          },
          title: 'Страна',
        },
      ]}
      dataSource={data?.teams.reduce((accumulator, team) => {
        accumulator.push({
          area: team.area.name,
          key: team.id,
          name: team.name,
          url: team.crestUrl,
        });

        return accumulator;
      }, Array.of<{ key: number; name: string; area: string; url: string }>())}
      loading={isLoading}
      rowClassName={styles.row}
      onRow={(record) => ({
        onClick: handleRowClick(record.key),
      })}
    />
  );
};
