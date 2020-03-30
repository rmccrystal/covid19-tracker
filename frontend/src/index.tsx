import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'semantic-ui-css/semantic.min.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '@blueprintjs/table/lib/css/table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'font-awesome/css/font-awesome.min.css';
import '@nivo/line';

import ReactGA from 'react-ga'
import {createBrowserHistory} from "history";

ReactGA.initialize("UA-162103195-1");

const history = createBrowserHistory();;

history.listen(location => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

ReactDOM.render(<App />, document.getElementById('root'));