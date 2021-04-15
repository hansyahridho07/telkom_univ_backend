"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Dosen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dosen.belongsTo(models.Matkul);
      Dosen.hasMany(models.JadwalMatkul);
    }
  }
  Dosen.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Nama tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Data nama tidak ada",
          },
        },
      },
      nip: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "NIP tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Data NIP tidak ada",
          },
        },
      },
      MatkulId: DataTypes.INTEGER,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username sudah ada",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Username tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Data username tidak ada",
          },
          len: {
            args: [5],
            msg: "Username minimal 5 karakter",
          },
          isLowercase: {
            args: true,
            msg: "Username harus huruf kecil semua",
          },
          isAlpha: {
            args: true,
            msg: "Username tidak bisa angka",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validatePassword: function (password) {
            if (
              !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
                password
              )
            ) {
              throw new Error(
                "The password must contain at least 10 and maximum 12 characters including at least 1 uppercase, 1 lowercase, one number and one special character."
              );
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Dosen",
      hooks: {
        beforeCreate: (dosen, opt) => {
          dosen.password = hashPassword(dosen.password);
        },
      },
    }
  );
  return Dosen;
};
