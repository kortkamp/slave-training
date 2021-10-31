import { Switch, Route } from 'react-router-dom';

import TrainingBed from './pages/TrainingBed';
import Bedroom from './pages/Bedroom';
import RestRoom from './pages/RestRoom';
import Kitchen from './pages/Kitchen';
import Hang from './pages/Hang';
import Street from './pages/Street';
import Head from './components/Head';

const Routes = ():JSX.Element => (
  <Switch>
    <Route path="/" exact component={TrainingBed} />
    <Route path="/bedroom" exact component={Bedroom} />
    <Route path="/kitchen" exact component={Kitchen} />
    <Route path="/RestRoom" exact component={RestRoom} />
    <Route path="/hang" exact component={Hang} />
    <Route path="/street" exact component={Street} />
    <Route path="/head" exact component={Head} />

  </Switch>
);

export default Routes;
