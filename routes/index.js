const router = require("express").Router();
const admin = require("./admin");
const dosen = require("./dosen");

router.use("/admin", admin);
router.use("/dosen", dosen);

module.exports = router;
