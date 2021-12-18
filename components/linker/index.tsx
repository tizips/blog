import { Props } from 'service/props';

import styles from 'styles/linker.module.scss';

export default function Linker(props: Props.Linker) {

  return (
    <div className={styles.link}>
      <ul>
        {
          props.items?.map(item => (
            <li key={item.uri}>
              <a href={item.uri} target='_blank'>{item.name}</a>
            </li>
          ))
        }
      </ul>
      {/*<p>我想背上行囊，去远方的他乡。去寻找你的过往，去实现我的梦想。</p>*/}
    </div>
  );
}