import Link from 'next/link';
import styles from 'styles/list.module.scss';
import dayjs from 'dayjs';

export default function List(props: Props.List) {

  return (
    <div className={styles.list}>
      <h3>
        <Link href={`/article/${props.id}`}>
          <a>{props.name}</a>
        </Link>
      </h3>
      <div className={styles.other}>
        <div>{dayjs(props.created_at).format('YYYY-MM-DD')}</div>
        <div>{props.category}</div>
      </div>
      <p className={styles.summary}>{props.summary}</p>
    </div>
  );
}