import React from 'react'
import FaxForm from './FaxForm/FaxForm.js'
import styles from './App.css'

const App = () =>

    <div className={styles.appContainer}>
        <div className={styles.mainField}>
          <h1 className={styles.header}>Fax it</h1>
          <FaxForm />
        </div>
    </div>

export default App
