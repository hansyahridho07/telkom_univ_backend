"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("JadwalMatkuls", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_siswa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DosenId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Dosens",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      jadwal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      MatkulId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Matkuls",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("JadwalMatkuls");
  },
};
