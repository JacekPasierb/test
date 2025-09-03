"use client";
import Image from "next/image";
import {useEffect, useState} from "react";

type Motorcycle = {
  _id: string;
  marka: string;
  model: string;
  rok: number;
  ksywka: string;
  przebieg: number;
  pojemnosc: number;
  imageUrl?: string;
};

export default function MotorcycleList() {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/motorcycles");
        if (!res.ok) throw new Error("Błąd pobierania");
        const data = await res.json();
        setMotorcycles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Ładowanie...</p>;

  return (
    <ul className="space-y-2">
      {motorcycles.map((m) => (
        <li
          key={m._id}
          className="border p-3 rounded-md grid grid-cols-2 md:grid-cols-2  gap-3 hover:bg-gray-300 cursor-pointer items-center"
        >
          <div className="justify-self-center">
            {m.imageUrl && (
              <Image
                width={122}
                height={122}
                src={m.imageUrl}
                alt={`${m.marka} ${m.model}`}
                className=" rounded-md object-cover mt-0"
              />
            )}
          </div>
          <div>
            <strong>
              {m.marka} {m.model}
            </strong>{" "}
            ({m.rok}) {m.ksywka}
            <p>
              Przebieg: {m.przebieg} km, Pojemność: {m.pojemnosc} l
            </p>
          </div>
          {/* <div className=" justify-self-center"> <button
              type="submit"
              className="px-4 py-2 mt-2 bg-black text-white rounded-lg hover:cursor-pointer"
            >
              Wybierz
            </button></div> */}
        </li>
      ))}
    </ul>
  );
}
