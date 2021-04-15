"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init(
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
          // notEmpty: {
          //   args: true,
          //   msg: "Password tidak boleh kosong",
          // },
          // notNull: {
          //   args: true,
          //   msg: "Data password tidak ada",
          // },
          // len: {
          //   args: [8],
          //   msg: "Panjang password minimal 8 karakter",
          // },
          // isUppercase: {
          //   args: true,
          //   msg: "Password minimal 1 huruf besar",
          // },
          // isLowercase: {
          //   args: true,
          //   msg: "Password minimal 1 huruf kecil",
          // },
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
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Admin",
      hooks: {
        beforeCreate: (admin, opt) => {
          admin.role = "admin";
          admin.password = hashPassword(admin.password);
        },
      },
    }
  );
  return Admin;
};
