import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";



const router = new express.Router();

const clientRoutes = ["/", "/user-sessions/new", "/users/new", "/users/:id", "/games", "/games/:id", "/games/:id/complete", "/games/:id/inprogress", "/games/:id/notstarted"];
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
