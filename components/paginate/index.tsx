import { useRouter } from 'next/router';

import styles from 'styles/paginate.module.scss';

export default function Paginate(props: Props.Paginate<any>) {

  const router = useRouter();

  const onPre = async () => {
    if (!doPre()) return;

    await router.push({
      pathname: router.pathname,
      query: Object.assign(router.query, { page: props.page as number - 1 }),
    });
  };

  const onNext = async () => {
    if (!doNext()) return;

    await router.push({
      pathname: router.pathname,
      query: Object.assign(router.query, { page: props.page as number + 1 }),
    });
  };

  const doPre = () => {
    return props.page && props.page > 1;
  };

  const doNext = () => {
    return props.page && props.total && props.size && props.page < Math.ceil(props.total / props.size);
  };

  return (
    <div className={styles.paginate}>
      <div>
        <a onClick={onPre} className={!doPre() ? styles.disable : ''}>
          <i className='iconfont'>&#xe617;</i></a>
      </div>
      <div>
        <span>{router.query.page || 1}</span>
      </div>
      <div>
        <a onClick={onNext} className={!doNext() ? styles.disable : ''}>
          <i className='iconfont'>&#xe61a;</i>
        </a>
      </div>
    </div>
  );
}