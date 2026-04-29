function Header({ onLogout }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>

      <button
        onClick={onLogout}
        className="bg-red-500 rounded hover:bg-red-600 text-white px-4 py-2 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Header;