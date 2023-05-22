import { Stats } from "../components/dashboard/Stats";
import { Users } from "../components/dashboard/Users";
import { Info } from "../components/dashboard/Info";
import ClientOnly from "../clientOnly";

export default function Dashboard() {
  return (
    <div className="max-w-7xl w-full mx-auto">
      <div className="flex flex-col">
        {/* <div className="flex justify-center items-center mt-10 bg-red-200">
          <div>
            <ClientOnly>
              <Info />
            </ClientOnly>
          </div>
        </div> */}
        <ClientOnly>
          <Info />
        </ClientOnly>
        <div className="flex min-h-screen flex-col items-center p-10">
          <ClientOnly>
            <Stats />
          </ClientOnly>
        </div>
      </div>
    </div>
  );
}
