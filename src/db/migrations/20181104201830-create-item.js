'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      isPurchased: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      listId: {
         type: Sequelize.INTEGER,
         onDelete: "CASCADE", // delete post if parent list is deleted
         allowNull: false,    // validation to prevent null value
         references: {        // association information
           model: "Lists",   // table name
           key: "id",         // attribute to use
           as: "listId"      // reference as listId
         },
       }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Items');
  }
};
