const express = require("express");
const router = express.Router();
const { create, index, find } = require("./controller");

router.get("/categories", index);

router.get("/categories/:id", find);

router.post("/categories", create);

module.exports = router;
