import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  const userId = user.id;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  const accessToken = jwt.sign(
    { userId, uuid, name, email, role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "20s",
    }
  );
  const refreshToken = jwt.sign(
    { userId, uuid, name, email, role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  await User.update(
    { refresh_token: refreshToken },
    {
      where: {
        id: userId,
      },
    }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    // secure: true,
  });
  res.status(200).json({ accessToken });
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const user = await User.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user) return res.sendStatus(204);

  const userId = user.id;
  await User.update({ refresh_token: null }, { where: { id: userId } });
  res.clearCookie("refreshToken");

  return res.sendStatus(200);
};
