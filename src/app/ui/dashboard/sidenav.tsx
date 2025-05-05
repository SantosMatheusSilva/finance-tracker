"use client";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserCard from "./user-card";
import { LogoutButton } from "./buttons";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();
  const { userId } = useParams();

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
          href={`/dashboard/${userId}/overview`}
          variant="ghost"
          radius="md"
          className={`${
            isActive(`/dashboard/${userId}/overview`) ? "ring-2 ring-blue-500 border-none" : ""
          } `}
        >
          <p className="text-lg">Dashboard</p>
        </Button>
        <Button
          as={Link}
          variant="ghost"
          radius="md"
          href={`/dashboard/${userId}/transactions`}
          className={`${
            isActive(`/dashboard/${userId}/transactions`)
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
          href={`/dashboard/${userId}/planner`}
          className={`${
            isActive(`/dashboard/${userId}/planner`)
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
          href={`/dashboard/${userId}/accounts`}
          className={`${
            isActive(`/dashboard/${userId}/accounts`)
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
          href={`/dashboard/${userId}/reports`}
          className={`${
            isActive(`/dashboard/${userId}/reports`)
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
