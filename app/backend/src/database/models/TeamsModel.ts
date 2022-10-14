import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
// import MatchesModel from './MatchesModel';
// import OtherModel from './OtherModel';

class TeamsModel extends Model {
  id!: number;
  teamName!: string;
}

TeamsModel.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  teamName: {
    type: STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

/*
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  */

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default TeamsModel;
