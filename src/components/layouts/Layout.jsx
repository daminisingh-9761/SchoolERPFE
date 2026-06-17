import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <Sidebar />

      <div className="min-w-0 flex-1 lg:ml-72">
        <Navbar />

        {/* Content Area */}
        <main className="px-8 py-6">
          {children}
        </main>

      </div>
    </div>
  );
}

export default Layout;