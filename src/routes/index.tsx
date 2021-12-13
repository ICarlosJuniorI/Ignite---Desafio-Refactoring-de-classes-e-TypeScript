import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

export default function Routes() {
  <Switch>
    <Route path="/" exact component={Dashboard} />
  </Switch>
};