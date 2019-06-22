import React from 'react';
import './App.module.css';
import Content from '../Components/Cockpit/Content';
import classes from './App.module.css'

const App = () =>
{
    // Rendering the cockpit component
    return (
        <div className={classes.App}>
            <Content/>
        </div>

    );
};

export default App;
