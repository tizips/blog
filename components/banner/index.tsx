import styles from 'styles/banner.module.scss';

export default function Banner(props: Props.Banner) {
  return (
    props.uri || process.env.NEXT_PUBLIC_BANNER ?
      <div className={styles.banner}>
        <img src={props.uri || process.env.NEXT_PUBLIC_BANNER} alt='' />
      </div> : <></>
  );
}