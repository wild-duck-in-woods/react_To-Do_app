function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="w-60 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      </div>

      <div className="flex-1 bg-gray-100 p-10">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;