import classNames from 'classnames';
import { VFC } from 'react';

import ball from './asserts/ball.jpg';
import styles from './TableCellName.module.scss';

type TableCellNameProps = {
  name: string;
  reverse?: boolean;
  url?: string;
};

export const TableCellName: VFC<TableCellNameProps> = (props) => {
  const { name, url, reverse } = props;

  return (
    <div
      className={classNames(styles.container, {
        [styles.reverse]: reverse,
      })}
    >
      <div>{name}</div>

      <div className={styles.logoWrapper}>
        <img alt="emblem" height="50px" src={url || ball} />
      </div>
    </div>
  );
};
