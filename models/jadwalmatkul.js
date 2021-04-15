"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JadwalMatkul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JadwalMatkul.belongsTo(models.Dosen);
      JadwalMatkul.belongsTo(models.Matkul);
    }
  }
  JadwalMatkul.init(
    {
      nama_siswa: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Nama siswa tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Data nama tidak ada",
          },
        },
      },
      DosenId: DataTypes.INTEGER,
      jadwal: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Jadwal tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Data jadwal tidak ada",
          },
        },
      },
      MatkulId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "JadwalMatkul",
    }
  );
  return JadwalMatkul;
};
