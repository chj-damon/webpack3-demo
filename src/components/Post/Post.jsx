import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Post.css';

export default props => (
    <div>
        <h2 className={styles.title}>
            <Link to={`/post/${props.slug}`} className={styles.link}>{props.title}</Link>
        </h2>
        <p className={styles.content}>{props.content}</p>
    </div>
);