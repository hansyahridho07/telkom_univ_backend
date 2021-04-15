const { Admin, Dosen, JadwalMatkul, Matkul } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class AdminController {
  static async createAdmin(req, res, next) {
    try {
      const { nama, username, password } = req.body;
      const admin = await Admin.create({ nama, username, password });
      res.status(201).json({ admin });
    } catch (error) {
      next(error);
    }
  }

  static async loginAdmin(req, res, next) {
    try {
      const { username, password } = req.body;
      const data = await Admin.findOne({ where: { username } });
      if (data && comparePassword(password, data.password)) {
        let payload = {
          id: data.id,
          nama: data.nama,
          username: data.username,
          role: data.role,
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

  static async registrasiDosen(req, res, next) {
    try {
      const { nama, nip, MatkulId, username, password } = req.body;
      const dosen = await Dosen.create({
        nama,
        nip,
        MatkulId,
        username,
        password,
      });
      res.status(201).json({ dosen });
    } catch (error) {
      next(error);
    }
  }

  static async showAllDosen(req, res, next) {
    try {
      const data = await Dosen.findAll({ include: Matkul });
      let result = [];
      data.forEach((el) => {
        let obj = {};
        obj.nama = el.nama;
        obj.nip = el.nip;
        obj.MatkulId = el.MatkulId;
        obj.Matkul = el.Matkul;
        result.push(obj);
      });
      res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  }

  static async createSchedule(req, res, next) {
    try {
      const { nama_siswa, DosenId, jadwal } = req.body;
      const dosen = await Dosen.findOne({ where: { id: DosenId } });
      if (dosen) {
        const schedule = await JadwalMatkul.create({
          nama_siswa,
          DosenId,
          jadwal: jadwal.toLowerCase(),
          MatkulId: dosen.MatkulId,
        });
        res.status(200).json({ schedule });
      } else {
        throw { name: "customError", status: 404, message: "Dosen not found" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async putSchedule(req, res, next) {
    try {
      const id = req.params.idJadwal;
      const { nama_siswa, DosenId, jadwal } = req.body;
      const dosen = await Dosen.findOne({ where: { id: DosenId } });
      if (!dosen) {
        throw { name: "customError", status: 404, message: "Dosen not found" };
      }
      const update = {
        nama_siswa,
        DosenId,
        jadwal: jadwal.toLowerCase(),
        MatkulId: dosen.MatkulId,
      };
      await JadwalMatkul.update(update, { where: { id } });
      res.status(200).json({ message: "Berhasil update jadwal matkul" });
    } catch (error) {
      next(error);
    }
  }

  static async patchSchedule(req, res, next) {
    try {
      const id = req.params.idJadwal;
      const { nama_siswa, DosenId, jadwal } = req.body;
      const jadwalMatkul = await JadwalMatkul.findByPk(id);
      if (!jadwalMatkul) {
        throw { name: "customError", status: 404, message: "Jadwal tidak ada" };
      }
      let dosen = true;
      if (DosenId) {
        dosen = await Dosen.findOne({
          where: { id: DosenId },
        });
      }

      if (!dosen) {
        throw {
          name: "customError",
          status: 404,
          message: "Dosen tidak ditemukan",
        };
      }
      let update = {};

      if (nama_siswa) {
        update.nama_siswa = nama_siswa;
      }
      if (DosenId) {
        update.MatkulId = dosen.MatkulId;
        update.DosenId = DosenId;
      }
      if (jadwal) {
        update.jadwal = jadwal.toLowerCase();
      }

      await JadwalMatkul.update(update, { where: { id } });
      res.status(200).json({ message: "Berhasil update jadwal matkul" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteSchedule(req, res, next) {
    try {
      const id = req.params.idJadwal;
      await JadwalMatkul.destroy({ where: { id } });
      res.status(200).json({ message: "Berhasil delete jadwal" });
    } catch (error) {
      next(error);
    }
  }

  static async createMatkul(req, res, next) {
    try {
      const { nama_matkul } = req.body;
      const matkul = await Matkul.create({ nama_matkul });
      res.status(201).json({ matkul });
    } catch (error) {
      next(error);
    }
  }

  static async updateMatkul(req, res, next) {
    try {
      const id = req.params.idMatkul;
      const { nama_matkul } = req.body;
      await Matkul.update({ nama_matkul }, { where: { id } });
      res.status(200).json({ message: "Update matkul berhasil" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMatkul(req, res, next) {
    try {
      const id = req.params.idMatkul;
      await Matkul.destroy({ where: { id } });
      res.status(200).json({ message: "Matkul berhasil di hapus" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminController;
