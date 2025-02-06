/* eslint-disable @typescript-eslint/no-require-imports */

import { Sequelize } from 'sequelize';

const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './whiteboard.db',  
});

// Define the Session model (table)
const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  drawingData: {
    type: DataTypes.TEXT,  // Store drawing data as a string
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});


const syncDb = async () => {
  try {
    await sequelize.sync({ force: false });  
    console.log('Database synced!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDb(); 

module.exports = { sequelize, Session };
