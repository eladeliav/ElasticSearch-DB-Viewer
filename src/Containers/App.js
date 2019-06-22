import React from 'react';
import './App.module.css';
import Cockpit from '../Components/Cockpit/Cockpit';
import classes from './App.module.css'

const App = () =>
{
    // Rendering the cockpit component
    return (
        <div className={classes.App}>
            <Cockpit/>
        </div>

    );
};

export default App;
