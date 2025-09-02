import crypto from "crypto";

export const runtime = "nodejs"; 

export async function GET() {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = process.env.CLOUDINARY_FOLDER || "motorcycles";
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;

  // UWAGA: łańcuch do podpisania musi być posortowany alfabetycznie wg kluczy
  const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(toSign).digest("hex");

  return new Response(
    JSON.stringify({ timestamp, signature, apiKey, cloudName, folder }),
    { headers: { "Content-Type": "application/json" } }
  );
}
