export const createUser = async (uid, username) => { 
	const user = new UserModel({ _id: uid, username });
	const savedUser = await user.save();
	return savedUser;
};

export const findUserByUsername = async (username) => {
	// const user = await db.collection("usermodels").findOne({ username });
	const user = await UserModel.findOne({ username });
	return user;
};

export const findUserByUId = async (uid) => {
	const user = await UserModel.findById(uid);	
	return user;
};