const router = require("express").Router();
const AdminController = require("../controllers/adminController");
const authentication = require("../middlewares/authentication");
const authorize = require("../middlewares/authorize");
const schedules = require("./schedule");
const matkuls = require("./matkul");

router.post("/loginAdmin", AdminController.loginAdmin);
router.use(authentication);
router.get("/allDosen", AdminController.showAllDosen);
router.post("/createAdmin", authorize, AdminController.createAdmin);
router.post("/createDosen", authorize, AdminController.registrasiDosen);
router.use("/schedule", schedules);
router.use("/matkul", matkuls);

module.exports = router;
