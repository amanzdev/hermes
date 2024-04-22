"use client"

import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import React from "react";
export default function PatientDashboardCard() {
    const router = useRouter()

    return (
        <Card className="w-[300px]">
            <CardHeader>
                <div className="flex flex-row justify-between items-center">
                    <span className="text-xs">8:00AM - 8:30AM</span>
                    <Badge variant="outline">Upcoming</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="line-clamp-1 text-ellipsis text-sm">Jane Doe</span>
                            <span className="text-xs">Room 7</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex flex-row gap-2">
                    <Button onClick={() => router.push('/doctor/patient/details')} size="sm" variant="outline">View
                        Patient</Button>
                </div>
            </CardFooter>
        </Card>
    )
}