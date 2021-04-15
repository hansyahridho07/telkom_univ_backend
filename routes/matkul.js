const router = require("express").Router();
const AdminController = require("../controllers/adminController");
const authorize = require("../middlewares/authorize");

router.post("/", AdminController.createMatkul);
router.put("/:idMatkul", AdminController.updateMatkul);
router.delete("/:idMatkul", AdminController.deleteMatkul);

module.exports = router;
