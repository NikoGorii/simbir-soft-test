import { notification, Table } from 'antd';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { isBefore, isSameDay, parseISO } from 'date-fns';
import { VFC } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../../hooks/useAppContext';

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
      'https://api.football-data.org/v2/competitions',
    ),
  );

  return (
    <Table
      columns={[
        {
          dataIndex: 'name',
          filterSearch: true,
          filters: data?.competitions.map(
            (competition): ColumnFilterItem => ({
              text: competition.name,
              value: competition.name,
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
          title: 'Название лиги',
        },
        {
          dataIndex: 'plan',
          key: 'plan',
          showSorterTooltip: {
            title: 'Для сортировки нажать',
          },
          sorter: (a, b) => {
            if (a.plan < b.plan) {
              return -1;
            }
            if (a.plan > b.plan) {
              return 1;
            }

            return 0;
          },
          title: 'Дивизион',
        },
        {
          dataIndex: 'date',
          key: 'date',
          sorter: (a, b) => {
            if (!a.date || !b.date) {
              return -1;
            }

            const pA = parseISO(a.date);
            const pB = parseISO(b.date);

            if (isSameDay(pA, pB)) {
              return 0;
            }

            if (isBefore(pA, pB)) {
              return 1;
            }

            return -1;
          },
          title: 'Дата соревнования',
        },
      ]}
      dataSource={data?.competitions.reduce((accumulator, competition) => {
        if (competition.plan === 'TIER_ONE') {
          accumulator.push({
            date: competition.currentSeason?.startDate ?? null,
            key: competition.id,
            name: competition.name,
            plan:
              competition.plan in ECurrentSeasonNames
                ? ECurrentSeasonNames[competition.plan]
                : competition.plan,
          });
        }

        return accumulator;
      }, Array.of<{ date: string | null; key: number; name: string; plan: string }>())}
      loading={isLoading}
      rowClassName={styles.row}
      onRow={(record) => ({
        async onClick() {
          const resp = await queryClient.fetchQuery('competitionMatches', () =>
            fetchService.fetch(
              `http://api.football-data.org/v2/competitions/${record.key}/matches`,
            ),
          );
          if ('errorCode' in resp) {
            notification.open({
              description:
                'Для типа вашего аккаунта данное соревнование недоступно, преобретите платную подписку',
              message: 'Ошибка запроса соревнования',
              type: 'error',
            });
          } else {
            navigate(`/competitions/${record.key}/matches`);
          }
        },
      })}
    />
  );
};
