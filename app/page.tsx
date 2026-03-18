import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">TeamFlow</h1>

        <p className="text-sm text-gray-400">
          Developed by{" "}
          <span className="text-white font-medium">Udit U Gunagi</span>
        </p>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-32 px-6">
        <h1 className="text-5xl font-bold mb-6">
          Manage Your Team Projects Effortlessly
        </h1>

        <p className="text-gray-400 max-w-xl mb-10">
          TeamFlow helps teams organize projects, track tasks, and collaborate
          efficiently in one powerful platform.
        </p>

        <div className="flex gap-6">
          <Link
            href="/register"
            className="bg-blue-600 px-8 py-3 rounded-lg hover:bg-blue-700 w-40 text-center"
          >
            Register
          </Link>

          <Link
            href="/login"
            className="bg-blue-600 px-8 py-3 rounded-lg hover:bg-blue-700 w-40 text-center"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-40 px-10 grid md:grid-cols-3 gap-10 text-center">
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Project Management</h3>
          <p className="text-gray-400">
            Organize projects and track progress in one place.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Task Tracking</h3>
          <p className="text-gray-400">
            Create tasks, update status, and monitor work easily.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
          <p className="text-gray-400">
            Keep your entire team aligned and productive.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-40 text-center text-gray-500 pb-10">
        © {new Date().getFullYear()} TeamFlow
      </footer>
    </div>
  );
}
