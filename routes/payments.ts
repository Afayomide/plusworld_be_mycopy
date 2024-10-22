const express = require("express");
const router = express.Router();
import { remove, verify, pay } from "../controllers/payments";
import verifyToken from "../verifyToken";

router.post("/pay").post(verifyToken, pay);

router.route("/verify/:reference").get(verifyToken, verify);

router.route("/remove").get(remove);

module.exports = router;
