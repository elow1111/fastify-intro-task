import _ from "lodash";
import fastify from "fastify";
import getUsers from "./utils.js";

export default () => {
  const app = fastify();

  const users = getUsers();

  app.get('/users', (req, res) => {
    const page = Number(req.query.page) || 1;
    const per = Number(req.query.per) || 5;

    const startIndex = (page - 1) * per;
    const endIndex = page * per;

    const answer = users.slice(startIndex, endIndex);

    res.send(answer);
  });

  return app;
};
