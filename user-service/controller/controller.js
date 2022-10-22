import * as admin from "firebase-admin"

export async function handleSignUp(req, res) {
	try {
		const { uid, username, role } = req.body;
		console.log(username)
		console.log(uid)
		if (!uid || !username) {
			console.debug("Missing fields");
			return res.status(400).json({ message: "Missing fields" });
		}
		
		await admin.auth().setCustomUserClaims(uid, { role })

        return res.status(201).send({ uid })
	} catch (err) {
		console.debug(err.message);
		return res.status(500).json({ message: `${err.code} - ${err.message}` });
	}
}

export async function handleLogin(req, res) {
	const { username, password } = req.body;

    if (!password || !username) {
		console.debug("Missing fields");
		return res.status(400).json({ message: "Missing fields" });
	}

	try {
        handleFirebaseLogin(username, password);
		// const user = await handleUserLogin(uid);
		// return res.status(200).json({
		// 	message: "Logged in and fetched user data",
		// 	user
		// });
	} catch (err) {
		// console.debug(err.message);
		// return res.status(500).json({ message: err.message });
	}
}
