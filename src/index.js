import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './state/store';
import registerServiceWorker from './utils/worker';
import './index.css';

// Initialise your application
store.subscribe(props => {
  ReactDOM.render(
    <App {...props} />,
    document.getElementById('root')
  );
});

registerServiceWorker();
