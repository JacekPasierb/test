import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser();
  return (
    <main className="p-8">
      <h2 className="text-xl font-semibold">Cześć, {user?.firstName ?? "Motocyklisto"}!</h2>
      {/* tu wstawisz: tankowania, nadchodzące serwisy, ulubione instrukcje */}
    </main>
  );
}
