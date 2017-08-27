import React from 'react';
import Post from '../../components/Post/Post';
import styles from './Posts.css';
import posts from './post.json';

export default () => (
    <div className={styles.container}>
        {
            posts.posts.map(post => <Post key={post.slug} {...post} />)
        }
    </div>
);