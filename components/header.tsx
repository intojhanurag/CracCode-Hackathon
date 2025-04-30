"use client";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { YoutubeIcon, Github, Users, LogOut, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ProfileDialog } from "./pop-up";
import { useState } from "react";

export function Header() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu
  const avatarSrc = "/profile.webp";
  const { user } = useUser();

  if (!user) {
    return null; // or render a loading state or skeleton
  }

  return (
    <>
      <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <YoutubeIcon className="h-6 w-6 text-red-500" />
            <Link href="/" className="text-xl font-bold text-white">
              YTLearn
            </Link>
            <Badge variant="outline" className="ml-2 hidden md:flex">
              Beta
            </Badge>
          </div>

          {/* User Profile, GitHub, and Dashboard */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="https://github.com/intojhanurag/CracCode-Hackathon">
              <Button variant="outline" size="sm" className="gap-2">
                <Github className="h-4 w-4" />
                <span>Star on GitHub</span>
              </Button>
            </Link>
            
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
            >
              Dashboard
            </Link>
            <Badge variant="secondary" className="gap-1">
              <Users className="h-3 w-3" />
              <span>1,234 users</span>
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={avatarSrc} alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarSrc} alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium leading-none">
                      {user.fullName || "Anonymous"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.primaryEmailAddress?.emailAddress || "No email"}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                    <User className="mr-2 h-4 w-4" />
                    <span className="cursor-pointer">Profile</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-500 p-0">
                  <SignOutButton>
                    <div className="flex items-center w-full px-2 py-1.5 hover:bg-red-100 dark:hover:bg-red-900 rounded-md">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span className="cursor-pointer">Log out</span>
                    </div>
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden bg-gray-900 text-white p-4 space-y-2">
            <Link
              href="/dashboard"
              className="block px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition"
            >
              Dashboard
            </Link>

            <Link href="https://github.com/intojhanurag/CracCode-Hackathon">
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 mt-2 flex justify-center"
              >
                <Github className="h-4 w-4" />
                <span>Star on GitHub</span>
              </Button>

            </Link>
            

            {/* Profile Icon for Mobile */}
            <div className="flex justify-center mt-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src={avatarSrc} alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="center">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatarSrc} alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium leading-none">
                        {user.fullName || "Anonymous"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.primaryEmailAddress?.emailAddress || "No email"}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                    <User className="mr-2 h-4 w-4" />
                    <span className="cursor-pointer">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 p-0">
                    <SignOutButton>
                      <div className="flex items-center w-full px-2 py-1.5 hover:bg-red-100 dark:hover:bg-red-900 rounded-md">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span className="cursor-pointer">Log out</span>
                      </div>
                    </SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        )}
      </header>
      <ProfileDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
