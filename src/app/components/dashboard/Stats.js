export function Stats() {
  return (
    <div className="w-full mx-auto lg:px-8 px-6 pb-3">
      <div className="flex lg:flex-row flex-row flex-wrap">
        <div className="flex-1 mx-2 mt-3">
          <div className="py-4 rounded bg-white text-black border rounded shadow">
            <div className="flex flex-col flex-wrap px-4">
              <div className="flex-1">
                <h1 className="font-bold lg:text-xl text-xs text-slate-500">
                  14
                </h1>
                <div className="mt-2 font-medium lg:text-sm text-xs text-slate-400">
                  <p>Rewards Minted</p>                  
                </div>
              </div>
            </div>                       
          </div>
        </div>
        <div className="flex-1 mx-2 mt-3">
          <div className="py-4 rounded bg-white text-black border rounded shadow">
            <div className="flex flex-col flex-wrap px-4">
              <div className="flex-1">
                <h1 className="font-bold lg:text-xl text-xs text-slate-500">
                  3
                </h1>
                <div className="mt-2 font-medium lg:text-sm text-xs text-slate-400">
                  <p>Distributed</p>                  
                </div>
              </div>
            </div>                       
          </div>
        </div>
        <div className="flex-1 mx-2 mt-3">
          <div className="py-4 rounded bg-white text-black border rounded shadow">
            <div className="flex flex-col flex-wrap px-4">
              <div className="flex-1">
                <h1 className="font-bold lg:text-xl text-xs text-slate-500">
                  500,000
                </h1>
                <div className="mt-2 font-medium lg:text-sm text-xs text-slate-400">
                  <p>Coin Balance</p>                  
                </div>
              </div>
            </div>                       
          </div>
        </div>
      </div>
    </div>
  );
}
