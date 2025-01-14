import { generateToken, buildIdGenerator } from "../utils.js";

export default (app) => {
  const users = [];

  const generateId = buildIdGenerator();

  app.get("/users/new", (req, res) => res.render("src/views/users/new"));

  app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const token = req.cookies.token; 

    const user = users.find((u) => u.id === id);

    if (!user || token !== user.token) {
      return res.status(404).send("User not found");
    }

    res.view("src/views/users/show", { user });
  });

  app.post("/users", (req, res) => {
    const token = generateToken();
    res.cookie("token", token);

    const { firstName, lastName, email } = req.body;
    const id = generateId();

    const user = { id, firstName, email, lastName, token };
    users.push(user);

    res.redirect(`/users/${id}`);
  });
};
