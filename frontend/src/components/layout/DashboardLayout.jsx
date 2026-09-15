"use client";

import Sidebar from "../SideBar";
import Header from "../Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f7f9fb]">

      <Sidebar />

      

        <Header />
        <div className="lg:ml-[300px]">
        <main className="p-2 ">
          {children}
        </main>

      </div>

    </div>
  );
}