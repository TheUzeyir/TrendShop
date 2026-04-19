import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const { name, email, password } = await req.json();

  const existUser = await User.findOne({ email });

  if (existUser) {
    return Response.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return Response.json({ message: "User created", user });
}