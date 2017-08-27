import React from 'react';
import Header from '../components/Header/Header';
import Post from '../components/Post/Post';
import styles from './App.css';

const App = () => (
    <div>
        <Header />
        <div className={styles.container}>
            <Post />
            <Post />
            <Post />
        </div>
    </div>
);
export default App;