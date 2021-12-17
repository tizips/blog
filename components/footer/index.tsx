import styles from 'styles/footer.module.scss';

export default function Footer(props: Props.Footer) {
  return (
    <div className={styles.footer}>
      <ul>
        {
          props.copyright ?
            <li>©️{props.copyright}</li> : <></>
        }
        {
          props.icp ?
            <li>{props.icp}</li> : <></>
        }
        {
          props.police ?
            <li><a href={process.env.NEXT_PUBLIC_PUBLIC} target='_blank'>{props.police}</a></li> : <></>
        }
      </ul>
    </div>
  );
}