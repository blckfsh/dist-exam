import { ViewNfts } from "@/app/components/profile/ViewNfts";
import { CoinBalance } from "@/app/components/profile/CoinBalance";
import { Welcome } from "@/app/components/profile/Welcome";

export default function Profile({ params: { address } }) {
  return (
    <div className="max-w-7xl w-full mx-auto">
      <div className="flex min-h-screen flex-col p-24">
        <div>
            <Welcome address={address} />
        </div>
        <div className="flex-1">
          <div className="flex flex-col">
            <div className="flex-1 mt-3">
              <ViewNfts profAddress={address} />
            </div>
            <div className="flex-1 mt-3">
              <CoinBalance profAddress={address} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
