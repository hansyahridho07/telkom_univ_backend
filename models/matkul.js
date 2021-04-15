"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Matkul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Matkul.hasOne(models.Dosen);
      Matkul.hasOne(models.JadwalMatkul);
    }
  }
  Matkul.init(
    {
      nama_matkul: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Mata kuliah tidak boleh kosong",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Matkul",
    }
  );
  return Matkul;
};
