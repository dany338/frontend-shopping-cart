import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from '@/auth.config';

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
};

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({ where: { email } });
  // const response = await axios.post("http://localhost:3000/api/auth/login", {
  //   email,
  //   password,
  // });

  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  if (!bcrypt.compareSync(password, user.password ?? "")) {
    return null;
  }

  return user;
};

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email: email,
      password: bcrypt.hashSync(password),
      name: email.split("@")[0],
    },
  });

  return user;
};
