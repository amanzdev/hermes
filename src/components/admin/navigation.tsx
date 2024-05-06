"use client"

import Image from "next/image";
import {Menubar, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import {useTheme} from "next-themes";
import {useRouter} from "next/navigation";
import {User} from "@supabase/auth-js";
import {Tables} from "../../../database.types";
import {createClient} from "@/utils/supabase/client";

interface NavigationProps {
    user: null | User
    profile: Tables<'staff'> | null
}

export default function Navigation({profile}: NavigationProps) {
    const supabase = createClient()
    const router = useRouter()
    const { setTheme } = useTheme()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/auth/login')
    }

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
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger onClick={() => router.push('/admin/patients')}>Patients</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger onClick={() => router.push('/admin/medicines')}>Medicines</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger onClick={() => router.push('/admin/staffs')}>Staffs</MenubarTrigger>
                    </MenubarMenu>
                </Menubar>
            </div>
            <div className="flex flex-row gap-4 items-center p-4">
                <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500">Welcome back,</span>
                    <span className="text-sm font-semibold">{profile?.name}</span>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage
                                src={'https://api.dicebear.com/8.x/adventurer-neutral/png?seed=' + profile?.name}/>
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
                            <DropdownMenuItem onClick={handleSignOut}>
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}