const router = require("express").Router();
const DosenController = require("../controllers/dosenController");
const authentication = require("../middlewares/authentication");
router.post("/loginDosen", DosenController.loginDosen);
router.use(authentication);
router.get("/scheduleDay", DosenController.findScheduleDosen);
router.get("/dosenSchedule/:dosenId", DosenController.getDosenSchedule);
router.get("/matkulSchedule/:matkulId", DosenController.getMatkulSchedule);

module.exports = router;
