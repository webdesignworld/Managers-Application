import Image from "next/image";
import Link from "next/link";
import logo from "./img/logo.svg";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggler from "@/components/ui/ThemeToggler";
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <>
    <div className="bg-primary dark:bg-slate-700 text-white k py-2 px-5 flex justify-between ">
    <Button className="bg-[#23155b] dark:bg-white"><Link href="/challenges">
        Challenges
      </Link></Button>

     

      <div className='flex items-center'>
        <ThemeToggler/>
        <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              width={40}
              className="rounded-full"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
         
          <DropdownMenuItem>
            <Link href="/challenges">Challenges</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/auth">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    </div>
    </>
  );
};

export default Navbar;
