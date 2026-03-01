"use client";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserCard from "./user-card";
import { LogoutButton } from "./buttons";
import { signOut } from "next-auth/react";


export default function SideNav() {
  const pathname = usePathname();


  const isActive = (href: string) => pathname === href;

  return (
    <Card
      className="lg:flex h-full flex-col px-3 py-4"
      isBlurred={false}
      radius="lg"
      isFooterBlurred={true}
    >
      <CardHeader>
        <UserCard />
      </CardHeader>
      <Divider className="my-5" />
      <CardBody className="flex flex-col justify-between my-10">
        <Button
          as={Link}
          href={`/dashboard`}
          variant="ghost"
          radius="md"
          className={`${
            isActive(`/dashboard`) ? "ring-2 ring-blue-500 border-none" : ""
          } `}
        >
          <p className="text-lg">Dashboard</p>
        </Button>
        <Button
          as={Link}
          variant="ghost"
          radius="md"
          href={`/dashboard/transactions`}
          className={`${
            isActive(`/dashboard/transactions`)
              ? "ring-2 ring-blue-500 border-none"
              : ""
          } `}
        >
          <p className="text-lg">Transactions</p>
        </Button>
        <Button
          as={Link}
          variant="ghost"
          radius="md"
          href={`/dashboard/planner`}
          className={`${
            isActive(`/dashboard/planner`)
              ? "ring-2 ring-blue-500 border-none"
              : ""
          } `}
          //isDisabled
        >
          <p className="text-lg">Planer</p>
        </Button>
        <Button
          as={Link}
          variant="ghost"
          radius="md"
          href={`/dashboard/accounts`}
          className={`${
            isActive(`/dashboard/accounts`)
              ? "ring-2 ring-blue-500 border-none"
              : ""
          } `}
          //isDisabled
        >
          <p className="text-lg">Accounts</p>
        </Button>
        <Button
          as={Link}
          variant="ghost"
          radius="md"
          href={`/dashboard/reports`}
          className={`${
            isActive(`/dashboard/reports`)
              ? "ring-2 ring-blue-500 border-none"
              : ""
          } `}
          //isDisabled
        >
          <p className="text-lg">Reports</p>
        </Button>
      </CardBody>
      <Divider className="my-5" />
      <CardFooter className="align-middle justify-center">
       <LogoutButton
          ariaLabel="Logout"
          size='md'
          color='danger'
          radius="sm"
          onPress={() => signOut({ callbackUrl: "/" })}
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
}
