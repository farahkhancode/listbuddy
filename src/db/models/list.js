'use strict';
module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define('List', {
    title: {
       type: DataTypes.STRING,
       allowNull: false
     },
     userId: {
     type: DataTypes.INTEGER
   }
  }, {});
  List.associate = function(models) {
    List.belongsTo(models.User, {
     foreignKey: "userId"
   });
    List.hasMany(models.Item, {
      foreignKey: "listId",
      as: "items"
    });
  };
  return List;
};
