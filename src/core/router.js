export class Router {
  constructor() {
    this.routes = {};
    this.initialRoute;
  }

  getInitialRoute = () => this.routes[this.initialRoute];

  setInitialRoute = (initialRoute, component) => {
    this.initialRoute = initialRoute;
    return this.route(initialRoute, component);
  };

  route = (name, component) => {
    if (component) this.routes[name] = {name, component};

    return this.routes[name];
  }
}

const router = new Router();

const {getInitialRoute, setInitialRoute, route} = router;

export {
  router as default,
  getInitialRoute,
  setInitialRoute,
  route
}
