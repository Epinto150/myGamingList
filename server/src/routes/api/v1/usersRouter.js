import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";
import UserSerializer from "../../../serializers/UserSerializer.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { username, password, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ username, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

usersRouter.patch("/:id", async (req, res) => {

  const { id } = req.params
  
  if (req.user) {
    
    let changes = req.body
    let updatedUser = await User.query()
    // const serializedUser = await UserSerializer.getDetails(user, currentUserId)

    try {

      Object.assign(updatedUser, changes)
      return res.status(200).json({ user: updatedUser })
    } catch (error) {
      return res.status(500).json({
        errors: error
      })
    }

  }
})

export default usersRouter;
