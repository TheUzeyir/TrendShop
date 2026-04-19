import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

// GET - 1 məhsul
export async function GET(req, { params }) {
  await connectDB();

  const product = await Product.findById(params.id);

  return Response.json(product);
}

// DELETE - silmək
export async function DELETE(req, { params }) {
  await connectDB();

  await Product.findByIdAndDelete(params.id);

  return Response.json({ message: "Product deleted" });
}

// UPDATE - yeniləmək
export async function PUT(req, { params }) {
  await connectDB();

  const body = await req.json();

  const updatedProduct = await Product.findByIdAndUpdate(
    params.id,
    body,
    { new: true }
  );

  return Response.json(updatedProduct);
}