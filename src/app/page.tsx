import {SignOutButton} from "@clerk/nextjs";
import MotorcycleForm from "./components/MotorcycleForm";
import MotorcycleList from "./components/MotorcycleList";

const Home = () => {
  return (
    <main className="p-3 flex flex-col md:flex-row h-auto md:h-screen items-stretch gap-3">
      <div className="flex-1 bg-white text-black border border-gray-500 rounded-md md:rounded-l-md md:rounded-r-none p-5 my-auto h-full">
        <MotorcycleForm />
      </div>
      <div className="flex-1 bg-white text-black border border-gray-500 rounded-md md:rounded-r-md md:rounded-l-none p-5 my-auto h-full">
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
        <MotorcycleList/>
      </div>
    </main>
  );
};

export default Home;
