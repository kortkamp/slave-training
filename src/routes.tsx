import { Switch, Route } from 'react-router-dom';

import MainRoom from './pages/MainRoom';

const Routes = ():JSX.Element => (
  <Switch>
    <Route path="/" exact component={MainRoom} />
  </Switch>
);

export default Routes;
