"use strict";

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      token: {
        type: DataTypes.STRING(145),
        allowNull: true,
      },
      linkedIn: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isAlreadyLogin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
        
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
        
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "company",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    }
  );
  user.associate = function (models) {
  //  user.hasOne(models.schools, { foreignKey: "user_id" });
    //user.belongsTo(models.roles, { foreignKey: "role_id" });
  };
  return user;
};