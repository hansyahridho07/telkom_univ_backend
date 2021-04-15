const { Dosen, JadwalMatkul, Matkul } = require("../models/index");
const { generateToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const { Op } = require("sequelize");
class DosenController {
  static async loginDosen(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await Dosen.findOne({ where: { username } });
      if (user && comparePassword(password, user.password)) {
        const payload = {
          id: user.id,
          nama: user.nama,
          MatkulId: user.MatkulId,
        };
        const access_token = generateToken(payload);
        res.status(200).json({ access_token });
      } else {
        throw {
          name: "customError",
          status: 401,
          message: "Invalid username/password",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async getDosenSchedule(req, res, next) {
    try {
      const id = req.params.dosenId;
      let schedule = await JadwalMatkul.findAll({
        where: { DosenId: id },
      });
      if (schedule.length === 0) {
        throw {
          name: "customError",
          status: 404,
          message: "Belum ada jadwal dengan dosen tersebut",
        };
      }

      let dosen = await Dosen.findByPk(id, { include: Matkul });
      dosen.username = null;
      dosen.password = null;
      res.status(200).json({ schedule, dosen });
    } catch (error) {
      next(error);
    }
  }

  static async getMatkulSchedule(req, res, next) {
    try {
      const id = req.params.matkulId;
      let schedule = await JadwalMatkul.findAll({
        where: { MatkulId: id },
        include: [Matkul],
      });
      if (schedule.length === 0) {
        throw {
          name: "customError",
          status: 404,
          message: "Matkul tersebut belum memiliki jadwal",
        };
      }
      res.status(200).json({ schedule });
    } catch (error) {
      next(error);
    }
  }

  static async findScheduleDosen(req, res, next) {
    try {
      const { hari } = req.body;
      const findSchedule = await JadwalMatkul.findAll({
        where: {
          [Op.and]: [
            { DosenId: req.decoded.id },
            { jadwal: hari.toLowerCase() },
          ],
        },
        include: Matkul,
      });
      // console.log(findSchedule);
      if (findSchedule.length === 0) {
        throw {
          name: "customError",
          status: 404,
          message: "Tidak ada jadwal di hari " + hari.toLowerCase(),
        };
      }
      res.status(200).json({ schedule: findSchedule });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DosenController;
