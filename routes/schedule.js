const router = require("express").Router();
const AdminController = require("../controllers/adminController");
const authorize = require("../middlewares/authorize");

router.post("/", authorize, AdminController.createSchedule);
router.put("/:idJadwal", authorize, AdminController.putSchedule);
router.patch("/:idJadwal", authorize, AdminController.patchSchedule);
router.delete("/:idJadwal", authorize, AdminController.deleteSchedule);

module.exports = router;
