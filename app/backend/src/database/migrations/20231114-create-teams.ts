"use strict";
import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('teams', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      teamName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'team_name'
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('teams');
  }
};