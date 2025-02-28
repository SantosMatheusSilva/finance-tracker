"use client";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter((segment) => segment);
    const breadcrumbs = pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      const name = decodeURIComponent(segment).replace(/-/g, ' '); // Format segment
      return { name, href };
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="">
   <Breadcrumbs aria-label="breadcrumb" className="mb-4">
        <BreadcrumbItem as={Link} href="/">
          Home
        </BreadcrumbItem>
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem
            key={crumb.href}
            as={Link}
            href={crumb.href}
            color={index === breadcrumbs.length - 1 ? "primary" : "foreground"}
          >
            {crumb.name}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
      <div className="w-full h-dvh mt-5 p-2 bg-default-50 rounded-2xl">{children}</div>
    </div>
  );
}



/* 
"use client";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { useRouter, usePathname } from "next/navigation";

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const breadcrumbs = [
    { label: "Transactions", path: "/dashboard/transactions" },
    { label: "Expense", path: "/dashboard/transactions/expense" },
    { label: "Income", path: "/dashboard/transactions/income" },
    { label: "Recurring", path: "/dashboard/transactions/recurring" },
  ];

  const handleNavigation = (path: string): void => {
    router.push(path); // Navigate to the corresponding path
  };

  return (
    <div className="">
      <Breadcrumbs
        hideSeparator
        classNames={{
          list: "gap-5",
        }}
        itemClasses={{
          item: [
            "px-2 py-1 border-small border-default-400 rounded-small text-lg",
            "data-[current=true]:border-default-800 data-[current=true]:border-blue-500 data-[current=true]:text-blue-500 transition-colors",
            "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
          ],
        }}
      >
        {breadcrumbs.map(({ label, path }) => (
          <BreadcrumbItem
          className="flex flex-row gap-5"
          size="lg"
          color="foreground"
            key={path}
            isCurrent={path === pathname}
            onClick={() => handleNavigation(path)}
          >
            {label}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
      <div className="w-full h-screen mt-5 p-2 bg-default-50 rounded-2xl">{children}</div>
    </div>
  );
}
*/