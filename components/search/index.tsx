import { Props } from 'service/props';

import styles from 'styles/search.module.scss';

export default function Search(props: Props.Search) {

  const onKeyDown = (e: any) => {
    const { value } = e.target;
    if (e.code == 'Enter' && props.onSearch) props.onSearch(value);
  };

  return (
    <div className={`${styles.search} ${props.show ? 'block' : 'hidden'}`}>
      <div className={styles.content}>
        <h3>您想搜索什么...</h3>
        <div className={styles.form}>
          <div className={styles.icon}>
          </div>
          <div className={styles.input}>
            <input placeholder='Enter search keywords...' onKeyDown={onKeyDown} />
          </div>
        </div>
      </div>
      <div className={styles.close} onClick={props.onClose} />
    </div>
  );
}