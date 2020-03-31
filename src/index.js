import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './App';

Sentry.init({dsn: "https://ccf362367d754f5397f81917e28982be@sentry.io/5182488"});

ReactDOM.render(<App />, document.getElementById('root'));