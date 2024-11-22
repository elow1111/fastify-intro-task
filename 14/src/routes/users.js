import { generateToken, buildIdGenerator } from "../utils.js";

export default (app) => {
  const users = [];

  const generateId = buildIdGenerator();

  app.get("/users/new", (req, res) => res.view("src/views/users/new"));

  // BEGIN (write your solution here)
  app.post("/users", (req, res) => {
    const { firstName, lastName, email } = req.body;

    const newUser = {
      id: generateId(),
      firstName,
      lastName,
      email,
      token: generateToken(),
    };

    users.push(newUser);

    res.setCookie('token', newUser.token, { httpOnly: true });
    res.redirect(`/users/${newUser.id}`);
  });

  app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === id);

    if (!user || req.cookies.token !== user.token) {
      return res.send("User not found");
    }

    res.view("src/views/users/show", { user });
  });
  // END
};
