import { Switch, Route } from 'react-router-dom';

import TrainingBed from './pages/TrainingBed';
import Bedroom from './pages/Bedroom';
import RestRoom from './pages/RestRoom';

const Routes = ():JSX.Element => (
  <Switch>
    <Route path="/" exact component={TrainingBed} />
    <Route path="/bedroom" exact component={Bedroom} />
    <Route path="/RestRoom" exact component={RestRoom} />
  </Switch>
);

export default Routes;
