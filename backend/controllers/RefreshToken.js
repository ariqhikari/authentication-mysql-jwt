import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decode) => {
        if (error) return res.sendStatus(403);

        const userId = user.id;
        const name = user.name;
        const email = user.email;
        const role = user.role;
        const accessToken = jwt.sign(
          { userId, name, email, role },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
