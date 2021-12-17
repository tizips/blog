import styles from 'styles/author.module.scss';

export default function Author(props: Props.Author) {
  return (
    <div className={styles.author}>
      <img src={props.avatar} alt={props.name} />
      <span>{props.name}</span>
    </div>
  );
}