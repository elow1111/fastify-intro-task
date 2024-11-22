import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import formbody from "@fastify/formbody";
import middie from "@fastify/middie";
import addRoutes from "./routes/index.js";

export default async () => {
  const app = fastify();

  await app.register(view, { engine: { pug } });
  await app.register(formbody);

  // BEGIN (write your solution here)
  await app.register(middie);

  const setCacheControlHeader = (req, res, next) => {
    if (!res.getHeader('Cache-Control')) {
      res.setHeader('Cache-Control', 'no-store');
    }
    next();
  };

  app.use(setCacheControlHeader);
  // END

  app.get("/", (req, res) => res.view("src/views/index"));

  addRoutes(app);

  return app;
};
