import { Props } from 'service/props';
import Link from 'next/link';

import styles from 'styles/nav.module.scss';

function Nav(props: Props.Nav) {

  return (
    <div className={styles.nav}>
      {
        props.name ?
          <div className={styles.logo}>
            <Link href='/'>
              <a>{props.name}</a>
            </Link>
          </div> : <></>
      }
      <div className={styles.navigator}>
        <div className={styles.pc}>
          <ul>
            <li>
              <Link href='/'><a>首页</a></Link>
            </li>
            {
              props.items?.map(item => (
                item.children ?
                  <li key={item.id}>
                    <a>纪录</a>
                    <ul>
                      {
                        item.children.map(val => (
                          <li key={val.id}>
                            <Link href={`/category/${val.uri}`}><a>{val.name}</a></Link>
                          </li>
                        ))
                      }
                    </ul>
                  </li> :
                  <li key={item.id}>
                    <Link href={`/category/${item.uri}`}><a>{item.name}</a></Link>
                  </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className={styles.search} onClick={props.onOpen}>
        <div className={styles.click} />
      </div>
    </div>
  );
}

export default Nav;