import _ from "lodash";
import fastify from "fastify";
import getUsers from "./utils.js";

export default () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.get('/users', async (request, reply) => {
    const page = parseInt(request.query.page, 10) || 1;
    const per = parseInt(request.query.per, 10) || 5;

    if (page < 1 || per < 1) {
      return reply.status(400).send({ error: 'Page and per must be positive integers' });
    }

    const startIndex = (page - 1) * per;
    const paginatedUsers = users.slice(startIndex, startIndex + per);

    return reply.send(paginatedUsers);
  // END

  return app;
};
