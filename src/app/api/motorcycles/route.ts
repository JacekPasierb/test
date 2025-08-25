import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import MotorcycleModel from "@/models/Motorcycle";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";

// GET /api/motorcycles – lista motocykli użytkownika
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const items = await MotorcycleModel.find({ userId }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(items);
}

// POST /api/motorcycles – dodaj motocykl
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json(); // { brand, model, year?, nickname?, odometer?, tankCapacity? }

  // prosta walidacja minimalna (chcesz – później dołożymy Yup)
  if (!body?.brand || !body?.model) {
    return NextResponse.json({ error: "brand i model są wymagane" }, { status: 400 });
  }

  await connectToDatabase();
  const created = await MotorcycleModel.create({ ...body, userId });
  return NextResponse.json(created, { status: 201 });
}
