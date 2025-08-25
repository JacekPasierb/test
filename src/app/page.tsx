import {SignOutButton} from "@clerk/nextjs";
import MotorcycleForm from "./components/MotorcycleForm";

const Home = () => {
  return (
    <main className="p-3 flex h-screen items-stretch">
      <div className="flex-1 bg-white text-black border border-gray-500 rounded-l-md p-5 my-auto h-full">
        <MotorcycleForm />
      </div>
      <div className="flex-1 bg-white text-black border border-gray-500 rounded-r-md p-5 my-auto h-full">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-2">Twój Garaż</h2>
          <SignOutButton redirectUrl="/sign-in">
            <button className="px-4 py-2 bg-black text-white rounded-lg">
              Opuść Garaż
            </button>
          </SignOutButton>
        </div>
        <p className="text-lg mb-2">
          Wybierz motocykl, aby otworzyć jego dashboard.
        </p>
      </div>
    </main>
  );
};

export default Home;
