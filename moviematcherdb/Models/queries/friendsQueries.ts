import Friend from "../friend";
import { fetchUserQuery } from "./userQueries";
import { Op } from 'sequelize';

export async function findAllFriendsID(id: number) {
  const friendIDArr: [number] = [id];
  const userFriends = await Friend.findAll({where: {uid: id}})
  const friendUsers = await Friend.findAll({where: {friendid: id}})
  userFriends.map(friend => {
    if (friend.dataValues) friendIDArr.push(friend.dataValues.friendid)
  })
  friendUsers.map(friend => {
    if (friend.dataValues) friendIDArr.push(friend.dataValues.uid)
  })
  if (friendIDArr.length === 1) return 'no friends'

  friendIDArr.shift();
  const uniqueSet = new Set(friendIDArr);
  const uniqueArr = [...uniqueSet];
  return uniqueArr;
}

export async function findAllFriends(id:number) {
  const IDs = await findAllFriendsID(id);
  if (IDs !== 'no friends') {
    return Promise.all(IDs.map((num: number) => {
      return fetchUserQuery(num);
    }))
  }
}

async function friendExists(id: number, friendID: number) {
  const exists = await Friend.findOne({where: { [Op.or]:[ { [Op.and]: [{uid: id}, {friendid: friendID}] }, { [Op.and]: [{uid: friendID}, {friendid: id}] } ] }})
  return exists && exists.dataValues ? exists.dataValues : false;
}

export async function addFriendQuery(id: number, friendID: number) {
  const exists = await friendExists(id, friendID);
  if (exists) return 'already exists'
  else {
    await Friend.create({uid: id, friendid: friendID})
    return await findAllFriends(id);
  }
}

export async function deleteFriendQuery(id: number, friendID: number) {
  const exists = await friendExists(id, friendID);
  if (!exists) return 'does not exist'
  else {
    const userID = exists.uid;
    const friend = exists.friendid;
    await Friend.destroy({where: {uid: userID, friendid: friend}})
    return await findAllFriends(id);
  }
}
