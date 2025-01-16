import Link from "next/link";
import React from "react";
import { Library } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { getInitials } from "@/lib/utils";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="text-blue-100 font-bold">
        <Library size={50} />
        Bin Hlaig စာအုပ်
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li className="">
          <Link href="/" className="text-base cursor-pointer capitalize">
            စာကြည်တိုက်
          </Link>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session?.user?.name || "In")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
