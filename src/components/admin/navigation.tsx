"use client"

import Image from "next/image";
import {Menubar, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuPortal,
    DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import {DarkModeToggle} from "@/components/dark-mode-toggle";
import {useTheme} from "next-themes";
import {useRouter} from "next/navigation";

export default function Navigation() {
    const router = useRouter()
    const { setTheme } = useTheme()

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-8 items-center p-4">
                <div className="flex flex-row items-center gap-3">
                    <Image
                        src="/logo.svg"
                        alt="Caduceus Logo"
                        className="dark:invert"
                        width={24}
                        height={24}
                        priority
                    />
                    <span className="font-semibold">Hermes</span>
                </div>
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger onClick={() => router.push('/doctor/dashboard')}>Home</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Appointments</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Lab Tests</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Prescriptions</MenubarTrigger>
                    </MenubarMenu>
                </Menubar>
            </div>
            <div className="flex flex-row gap-4 items-center p-4">
                <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500">Welcome back doctor,</span>
                    <span className="text-sm font-semibold">John Doe</span>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem onClick={() => setTheme("light")}>
                                            Light
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                                            Dark
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setTheme("system")}>
                                            System
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}