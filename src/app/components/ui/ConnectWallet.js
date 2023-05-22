export function ConnectWallet() {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center content-between pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <div>
        <button
          type="button"
          className="flex py-2 px-4 rounded-3xl font-bold bg-slate-50 hover:bg-slate-200"
          onClick={() => console.log("Shit Happens")}
        >
          <span>
            
          </span>
          Connect a wallet
        </button>
      </div>
    </div>
  );
}
