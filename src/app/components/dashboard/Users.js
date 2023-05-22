"use client";
import ClientOnly from "@/app/clientOnly";
import Link from "next/link";

const users = [
  {
    wallet: "0x1BA8f5D548Bf698d5b33d0BD5628C2EB76253264",
  },
  {
    wallet: "0x9532b57CeAc5Ba4a29B1FF8F0744Cc9C39D1FE2D",
  },
  {
    wallet: "0xAE54f9978781B1b359B7289B77BAa5Cc2CA717E4",
  },
];

export function Users() {
  return (
    <div className="mx-2 py-4 rounded bg-white text-black border rounded shadow">
      <div className="flex flex-col flex-wrap px-4">
        <div className="py-5">
          <div className="px-5 border-b border-slate-200 pb-4 mb-4">
            <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-slate-500">
              Users
            </h1>
          </div>
          <div className="rounded-lg">
            <ClientOnly>
              <table className="table-auto w-full text-center lg:table hidden">
                <thead>
                  <tr className="border-b-2">
                    <th className="py-4">Address</th>
                    <th className="py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => {
                    return (
                      <tr key={index} className="border-b-2">
                        <td>{user.wallet}</td>
                        <td>
                          <Link
                            className="pointer text-indigo-400 font-bold"
                            href={`/profile/${user.wallet}`}
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  );
}
