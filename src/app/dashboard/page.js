import { Stats } from "../components/dashboard/Stats";
import { Users } from "../components/dashboard/Users";
import { Info } from "../components/dashboard/Info";

export default function Dashboard() {
  return (
    <div className="max-w-7xl w-full mx-auto">
      <div className="flex min-h-screen flex-col items-center p-24">
        <Stats />
        <div className="w-full mx-auto mt-10 lg:px-8 px-6">
          <div className="flex flex-row justify-between flex-wrap">
            <div className="basis-2/3">
              <Users />
            </div>
            <div className="basis-1/3">
              <Info />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
