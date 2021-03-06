import { FC, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import { theme } from './theme';
import { ParticipantsContextProvider } from './contexts';

import { ErrorBoundary, ErrorFallback, SuspenseFallback } from './components';
import Error404Page from './pages/Error404';

const EventsPage = lazy(() => import('./pages/Events'));
const EventPage = lazy(() => import('./pages/Event'));

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <ParticipantsContextProvider>
          <Suspense fallback={<SuspenseFallback />}>
            <Switch>
              <Redirect from="/" exact to="/events" />
              <Route path="/events" exact component={EventsPage} />
              <Route path="/events/:eventId" exact component={EventPage} />
              <Route component={Error404Page} />
            </Switch>
          </Suspense>
        </ParticipantsContextProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
