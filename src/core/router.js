import React, {Component} from 'react';
import _ from 'lodash';

export class Router {
  constructor() {
    this.routes = {};
  }

  getInitialRoute = () => this.routes[this.initialRoute];

  setInitialRoute = (initialRoute, component) => {
    this.initialRoute = initialRoute;
    return this.route(initialRoute, component);
  };

  route = (name, component) => {
    if (component) this.routes[name] = {name, component};

    return this.routes[name];
  };

  renderScene = (route, navigator) => {
    this.navigator = navigator;
    const Component = route.component;
    const props = route.props || {};
    return <Component name={route.name} {...props} />;
  };

  _getRouteWithProps = (routeName, props) => {
    const route = this.route(routeName);
    if (!route) throw new Error(`route not found! route name: ${routeName}`);
    if (props) {
      route.props = _.assign(route.props, props);
    }
    return route;
  };

  popWithProps = props => {
    const routes = navigator.getCurrentRoutes();
    const pr = routes[routes.length - 2];
    navigator.replacePreviousAndPop({...pr, props});
  };

  // proxy navigator

  push = (routeName, props) => {
    const route = this._getRouteWithProps(routeName, props);
    this.navigator.push(route);
  };

  pop = () => this.navigator.pop();
}

const router = new Router();

const {getInitialRoute, setInitialRoute, route, renderScene} = router;

export {
  router as default,
  getInitialRoute,
  setInitialRoute,
  route,
  renderScene
}
