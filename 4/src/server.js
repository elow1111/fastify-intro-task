import fastify from "fastify";
import getCompanies from "./utils.js";

export default () => {
  const app = fastify();

  const companies = getCompanies();

  // BEGIN (write your solution here)
  app.get('/companies/:id', (req, res) => {
    const id = req.params.id;
    const answer = companies.find((item) => item.id === id)
    if (answer) {
      res.send(answer)
    }
    else {
      res.code(404).send('Company not found')
    }
  });
  // END

  return app;
};
