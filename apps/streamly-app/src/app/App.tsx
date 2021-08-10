import { Route, Switch } from 'react-router-dom';

export function App() {
  return (
    <Switch>
      <Route path="/" exact render={() => <div />} />
    </Switch>
  );
}

export default App;
