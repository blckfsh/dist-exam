import ClientOnly from "@/app/clientOnly";
import { Tasks } from "@/app/components/rewards/nft/Tasks";

export default function NftRewards() {
  return (
    <div className="max-w-7xl w-full mx-auto">
      <div className="flex min-h-screen flex-col items-center p-24">
        <ClientOnly>
          <Tasks />
        </ClientOnly>
      </div>
    </div>
  );
}
