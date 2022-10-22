import firebase from "../config/firebaseConfig.js";

export async function decodeIDToken(req, res, next) {
    if (req.headers?.authorization?.startsWith('Bearer ')) {
      const idToken = req.headers.authorization.split('Bearer ')[1];
      if (!idToken || idToken === "null") {
        return res.status(403).json({ message: "A token is required for authentication" });
      }
  
      try {
        const decodedToken = await firebase.auth.verifyIdToken(idToken);
        req.user = decodedToken;
        next();
      } catch (err) {
        console.log(err);
        res.status(401).send({ message: 'Invalid token' });
      }
    }
  
    return next;
  }