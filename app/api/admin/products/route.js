import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

// GET - bütün məhsullar (admin görür)
export async function GET() {
  await connectDB();

  const products = await Product.find();

  return Response.json(products);
}

// POST - yeni məhsul əlavə (admin)
export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const product = await Product.create(body);

  return Response.json(product);
}