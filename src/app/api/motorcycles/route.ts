import {NextResponse} from "next/server";
import {connectToDatabase} from "@/lib/mongo";

import {auth} from "@clerk/nextjs/server";
import Motorcycle from "../../../models/Motorcycle";

export const runtime = "nodejs";

// GET /api/motorcycles – lista motocykli użytkownika


export async function GET() {
  try {
    await connectToDatabase();
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const items = await Motorcycle.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(items);
  } catch (err) {
    console.error("GET /api/motorcycles error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export const POST = async (req: Request) => {
  try {
    const {userId} = await auth();
    if (!userId)
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    console.log("TU", userId);

    await connectToDatabase();
    const body = await req.json();

    // minimalne „utwardzenie” typów z frontu
    const doc = {
      marka: String(body.marka || "").trim(),
      model: String(body.model || "").trim(),
      rok: Number(body.rok),
      ksywka: String(body.ksywka || "").trim(),
      przebieg: Number(body.przebieg),
      pojemnosc: Number(body.pojemnosc),
      imageUrl: body.imageUrl ? String(body.imageUrl) : undefined,
      userId,
    };
    // proste sprawdzenia (opcjonalnie możesz użyć Zod/Yup po stronie API)
    if (!doc.marka || !doc.model || !doc.ksywka)
      return NextResponse.json({error: "Brak wymaganych pól"}, {status: 400});
    if (!Number.isFinite(doc.rok) || doc.rok < 1900)
      return NextResponse.json({error: "Niepoprawny rok"}, {status: 400});
    if (!Number.isFinite(doc.przebieg) || doc.przebieg < 0)
      return NextResponse.json({error: "Niepoprawny przebieg"}, {status: 400});
    if (!Number.isFinite(doc.pojemnosc) || doc.pojemnosc < 0)
      return NextResponse.json({error: "Niepoprawna pojemność"}, {status: 400});

    const created = await Motorcycle.create(doc);
    console.log("Fff", created);

    return NextResponse.json({success: true, created}, {status: 201});
  } catch (error) {
    console.error("POST /api/motorcycles error:", error);
    return NextResponse.json({success: false, error}, {status: 500});
  }
};
