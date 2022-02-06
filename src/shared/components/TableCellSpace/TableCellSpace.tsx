import { VFC } from 'react';

import styles from './TableCellSpace.module.scss';

type TableCellSpaceProps = {
  left: string;
  right: string;
};

export const TableCellSpace: VFC<TableCellSpaceProps> = (props) => {
  const { right, left } = props;

  return (
    <div className={styles.score}>
      <div>{left}</div>&nbsp;:&nbsp;
      <div>{right}</div>
    </div>
  );
};
