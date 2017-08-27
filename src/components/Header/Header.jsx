import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css';

export default () => (
    <header className={styles.header}>
        <div className={styles.container}>
            <h1 className={styles.title}>React PWA</h1>
            <nav>
                <ul className={styles.list}>
                    <li className={styles.listItem}><Link to="/posts" className={styles.link}>Posts</Link></li>
                    <li className={styles.listItem}><Link to="/about" className={styles.link}>About</Link></li>
                </ul>
            </nav>
        </div>
    </header>
);