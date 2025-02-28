'use client'
import SideNav from "@/app/ui/dashboard/sidenav";
import BottomNav from "@/app/ui/dashboard/bottom-nav";
import TopNavbar from "@/app/ui/dashboard/navbar";
import { useRef } from "react";
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}
) {
    const sideNavRef = useRef(null);

    return (
        <>
  <div className="flex h-screen flex-col  md:p-5 md:flex-row md:overflow-hidden">
    {/* SideNav (visible in md and lg screens) */}
    <div ref={sideNavRef} className="w-full md:w-64 md:block hidden">
      <SideNav />
    </div>

    {/* Main Content Area */}
    <div className="flex-grow flex flex-col">
      {/* TopNavbar */}
     <div className="w-full md:pl-5">
     <TopNavbar sideNavRef={sideNavRef} />
     </div>

      {/* BottomNav (visible on small screens only) */}
      <div className="w-full sm:hidden">
        <BottomNav />
      </div>

      {/* Child Content */}
      <div className="flex-grow py-5 md:overflow-y-auto md:pl-5">
        {children}
      </div>
    </div>
  </div>
</>
    )
}

/* 
    <>
       
            <div className="flex h-screen p-5 flex-col md:flex-row md:overflow-hidden"> 
              
            <div ref={sideNavRef} className="w-full flex-none md:w-64 md:block hidden">
            <SideNav />
        </div>
        
        <div className="w-full sm:hidden">
            <BottomNav />
        </div>
        <div className="flex-grow py-5 md:overflow-y-auto md:pl-5">
            {children}
        </div>
    </div>
</>
*/