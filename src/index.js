import React from 'react';
import ReactDOM from 'react-dom';
import PrimeReact from 'primereact/api';

import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

//???????????
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.scss';

import App from './components/App/App';

PrimeReact.ripple = true;

ReactDOM.render(<App />, document.getElementById('root'));

