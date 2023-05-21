export function Welcome({ address }) {
    return (
      <div className="mx-2 rounded bg-white text-black border rounded shadow">
        <div className="flex flex-col flex-wrap px-4">
          <div className="py-5">
            <div className="px-5">
              <p className="text-xl font-bold text-slate-500">
                User, {address}
              </p>
            </div>            
          </div>
        </div>
      </div>
    );
  }
  