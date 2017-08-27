import React from 'react';
import styles from './Header.css';

export default () => (
    <header className={styles.header}>
        <div className={styles.container}>
            <h1 className={styles.title}>React PWA</h1>
            <nav>
                <ul className={styles.list}>
                    <li className={styles.listItem}><a href="#" className={styles.link}>Posts</a></li>
                    <li className={styles.listItem}><a href="#" className={styles.link}>About</a></li>
                </ul>
            </nav>
        </div>
    </header>
);