
export default function DashboardPage() {
  return (
    <div className="">
      <h1 className="font-product text-3xl font-bold tracking-wider">Dashboard</h1>

      <div className="grid grid-cols-3 gap-3">
        <div className="card bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
          <p className="text-2xl">$12,345</p>
        </div>

        <div className="card bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
          <p className="text-2xl">$12,345</p>
        </div>

        <div className="card bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
          <p className="text-2xl">$12,345</p>
        </div>
      </div>
    </div>
  )
}
