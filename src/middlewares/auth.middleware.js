import { verifyToken } from "../utils/tokenHelper.js";
const authVerificationUser = async (req, res, next) => {
  try {
    const token = req.cookies["u_token"];

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const decodedToken = verifyToken(token);

    if (decodedToken) {
      const email = decodedToken["email"];
      const _id = decodedToken["_id"];

      req.headers.email = email;
      req.headers._id = _id;
      next();
    } else {
      return next(new Error("Unauthorized"));
    }
  } catch (error) {
    return next(error);
  }
};

export default authVerificationUser;
