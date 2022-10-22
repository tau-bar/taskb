import { createUser, findUserByUId } from "../repository/repository.js";

export const handleUserCreate = async (uid, username) => {
	const user = await createUser(uid, username);
	return user;
};

export const handleUserLogin = async (uid) => {
	const user = await findUserByUId(uid); 
	return user;
}; 