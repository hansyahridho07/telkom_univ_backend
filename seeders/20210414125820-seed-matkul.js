"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const matkul = [
      {
        nama_matkul: "IPA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_matkul: "IPS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_matkul: "Matematika",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Matkuls", matkul, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Matkuls", null, {});
  },
};
