"use strict";
import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('matches', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        field: 'home_team_id',
        references: {
          model: "teams",
          key: "id"
        }
      },
      homeTeamGoals: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'home_team_goals'
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        field: 'away_team_id',
        references: {
          model: "teams",
          key: "id"
        }
      },
      awayTeamGoals: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'away_team_goals'
      },
      inProgress: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'in_progress'
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('teams');
  }
};