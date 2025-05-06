"use client";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { usePathname, useParams } from "next/navigation";

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const params = useParams();
  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
  
    return pathSegments.map((segment, index) => {
      const isUserId = segment === params.userId;
      const isOverview = segment === 'overview';
  
      // Skip rendering "overview" as a breadcrumb
      if (isOverview) return null;
  
      // When rendering "dashboard", override the href to include userId
      if (segment === 'dashboard') {
        return {
          name: 'Dashboard',
          href: `/dashboard/${params.userId}`,
        };
      }
  
      // Skip showing the userId as a label
      if (isUserId) return null;
  
      // Format label
      const decoded = decodeURIComponent(segment).replace(/-/g, ' ');
      const formatted = decoded.charAt(0).toUpperCase() + decoded.slice(1);
  
      // Construct href normally
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
  
      return { name: formatted, href };
    }).filter(Boolean); // Remove nulls
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="">
   <Breadcrumbs aria-label="breadcrumb" className="mb-4">
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem
            key={crumb?.href}
            //as={Link}
            href={crumb?.href}
            color={index === breadcrumbs.length - 1 ? "primary" : "foreground"}
          >
            {crumb?.name}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
      <div className="w-full h-dvh mt-5 p-2 bg-default-50 rounded-2xl">{children}</div>
    </div>
  );
}
