"use strict";
const util = require("./util/util");

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable("Stations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lat: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      lng: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: { type: Sequelize.DATE, allowedNull: false },
      retiredAt: { type: Sequelize.DATE, allowedNull: false }
    });
    await util.migrationAddBelongsTo(queryInterface, "Stations", "Groups");
  },

  down: async function (queryInterface) {
    await util.migrationRemoveBelongsTo(queryInterface, "Stations", "Groups");
    await queryInterface.dropTable("Groups");
  }
};
