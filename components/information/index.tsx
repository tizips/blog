import { Props } from 'service/props';
import dayjs from 'dayjs';

import styles from 'styles/information.module.scss';

export default function Information(props: Props.Information) {

  return (
    <div className={styles.information}>
      <div className={styles.title}><h1>{props.title}</h1></div>
      {
        props.content ?
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: props.content }} /> : <></>
      }
      {
        props.is_meta ?
          <div className={styles.meta}>
            <p>— 著作于 {props.datetime && dayjs(props.datetime).format('YYYY年MM月DD日')} - {props.category}</p>
            <p>— 转载于 <a href={props.source_url}>{props.source_name}</a></p>
          </div> : <></>
      }
    </div>
  );
}