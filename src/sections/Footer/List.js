import React from 'react';
import styles from "./Styles.module.scss";

const List = ({title, content}) => {
  return (
    <div className={styles.list}>
      <h5>{title}</h5>
      <ul>
        {content.map(item => <li>{item}</li>)}
      </ul>
    </div>
  );
}

export default List;
