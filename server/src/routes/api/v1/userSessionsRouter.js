import express from "express";
import passport from "passport";

const sessionRouter = new express.Router();

sessionRouter.post("/", (req, res, next) => {
  return passport.authenticate("local", (err, user) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    if (user) {
      return req.login(user, () => {
        return res.status(201).json(user);
      });
    }

    return res.status(401).json(undefined);
  })(req, res, next);
});

sessionRouter.get("/current", async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json(undefined);
  }
});

sessionRouter.delete("/", (req, res) => {
  req.logout();
  res.status(200).json({ message: "User signed out" });
});

sessionRouter.patch("/current", async (req, res) => {

  
  if (req.user) {
    
    let changes = req.body
    let updatedUser = req.user
    
    try {
      Object.assign(updatedUser, changes)
      return res.status(200).json(updatedUser)
    } catch (error) {
      return res.status(500).json({
        errors: error
      })
    }

  }
})

export default sessionRouter;
