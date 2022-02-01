import { VFC } from 'react';

import styles from './TableCellSpace.module.scss';

type TableCellSpaceProps = {
  homeTeam: string;
  awayTeam: string;
  score: string;
};
// какие пропсы использовать и как их привязать к дивам?
// как использовать компоненту в файле?
export const TableCellSpace: VFC<TableCellSpaceProps> = (props) => {
  const { homeTeam, awayTeam, score } = props;

  return (
    <div className={styles.score}>
      <div>{homeTeam || score}</div>&nbsp;:&nbsp;
      <div>{awayTeam || score}</div>
    </div>
  );
};
