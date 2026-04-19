import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

// GET - bütün məhsulları gətir
export async function GET() {
  await connectDB();

  const products = await Product.find();

  return Response.json(products);
}

// POST - yeni məhsul əlavə et
export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const newProduct = await Product.create(body);

  return Response.json(newProduct);
}