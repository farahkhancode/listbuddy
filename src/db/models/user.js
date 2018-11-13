'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "member"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  User.associate = function(models) {
    User.hasMany(models.List, {
      foreignKey: "userId",
      as: "lists"
    });
    // associations can be defined here
  };

  return User;
};
