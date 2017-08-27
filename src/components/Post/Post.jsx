import React from 'react';
import { Route } from 'react-router-dom';
import PostDetail from '../../pages/PostDetail/PostDetail';
import styles from './Post.css';

export default props => (
    <div>
        <h2 className={styles.title}><a href={`/post/${props.slug}`} className={styles.link}>{props.title}</a></h2>
        <p className={styles.content}>{props.content}</p>

        <Route path="/post/:slug" component={PostDetail} />
    </div>
);