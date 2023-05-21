export function Info() {
  return (
    <div className="mx-1 py-4 rounded bg-white text-black border rounded shadow">
      <div className="flex flex-col flex-wrap px-4">
        <div className="py-5">
          <div className="px-5 border-b border-slate-200 pb-4 mb-4">
            <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-slate-500">
              Info
            </h1>
          </div>
          <div className="rounded-lg">
            <p>Status: Minting/Distributing Rewards/Completed/Paused</p>
            <p className="mt-3">Action: Minting rewards for new applicants</p>
          </div>
        </div>
      </div>
    </div>
  );
}
