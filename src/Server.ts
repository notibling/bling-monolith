import express, { Application } from 'express';
import cors from 'cors';

class ServerClass {
  app: Application = express();

  constructor() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors({ origin: '*' }));
    this.app.use('/uploads', express.static(__dirname + '/../uploads'));
  }

  private printRoutes() {
    const routes: { methods: string[], path: string }[] = [];

    const parseRoute = (def: any) => {
      if (def.route) {
        routes.push({ path: def.route.path, methods: Object.keys(def.route.methods) });
      } else if (def.name === 'router') {
        // nested route (sub router)..
        def.handle.stack.forEach(parseRoute);
      }
    }

    // loop over and parse routes
    this.app._router.stack.forEach(parseRoute);
    console.log(routes);
  }

  listen(port = 5000) {
    this.printRoutes();
    this.app.listen(port, () => {
      console.log('Server running in port ' + port);
    })
  }
}

const Server = new ServerClass();

export { Server }