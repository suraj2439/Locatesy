import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const script = document.createElement("script");

    script.src = "https://apis.mapmyindia.com/advancedmaps/v1/0a44c8f158050df757c91029e556b986/map_load?v=1.5";
    script.async = false;

    document.body.appendChild(script);

    script.src = "https://apis.mapmyindia.com/advancedmaps/v1/0a44c8f158050df757c91029e556b986/map_load?v=1.5";
    script.async = false;

    document.body.appendChild(script);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
