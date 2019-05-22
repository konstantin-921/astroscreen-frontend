import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import AlertPage from 'pages/AlertPage';
// pages
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import ListPage from 'pages/ListPage'
import DashboardPage from 'pages/DashboardPage';
import DetailsPage from 'pages/DetailsPage'
import './styles/reduction.scss';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/"
              layout={MainLayout}
              component={DashboardPage}
            />
            <LayoutRoute
              exact
              path="/list"
              layout={MainLayout}
              component={ListPage}
            />
            <LayoutRoute
              exact
              path="/details"
              layout={MainLayout}
              component={DetailsPage}
            />
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
