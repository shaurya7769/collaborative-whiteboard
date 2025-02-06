// db.js

const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './whiteboard.db',  // Path to the SQLite database file
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

// Sync the database (create tables if they don't exist)
const syncDb = async () => {
  try {
    await sequelize.sync({ force: false });  // 'force: false' will not drop existing tables
    console.log('Database synced!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDb(); // Run sync to create tables

module.exports = { sequelize, Session };
