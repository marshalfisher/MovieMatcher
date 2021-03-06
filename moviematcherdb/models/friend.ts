import { Model } from 'sequelize';
import { sequelize, DataTypes } from './index';

export interface FriendAttributes {
  uid: number;
  friendid: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface FriendInstance
  extends Model<FriendAttributes>,
  FriendAttributes {
      dataValues?: FriendAttributes
    }

    const Friend = sequelize.define<FriendInstance>('friend', {
      uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      friendid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    })

export default Friend