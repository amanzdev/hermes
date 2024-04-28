"use client"

import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import React from "react";
import dayjs from 'dayjs';

interface PatientDashboardCardProps {
    appointment: {
        time: string;
        patients: {
            id: string;
            name: string;
        } | null;
        departments: {
            name: string;
        } | null;
    }
}

export default function PatientDashboardCard({appointment}: PatientDashboardCardProps) {
    const router = useRouter()

    const isUpcoming = dayjs().isBefore(dayjs(appointment.time))

    return (
        <Card className="w-[300px]">
            <CardHeader>
                <div className="flex flex-row justify-between items-center">
                    <span className="text-xs">{dayjs(appointment.time).format('DD MMM YYYY - hh:mmA')}</span>
                    <Badge variant="outline"
                           className={isUpcoming ? '' : '!border-green-400'}>{isUpcoming ? 'Upcoming' : 'Today'}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-2">
                        <Avatar>
                            <AvatarImage
                                src={'https://api.dicebear.com/8.x/adventurer-neutral/png?seed=' + appointment.patients?.name}/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="line-clamp-1 text-ellipsis text-sm">{appointment.patients?.name}</span>
                            <span className="text-xs">{appointment.departments?.name}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex flex-row gap-2">
                    <Button onClick={() => router.push('/doctor/patient/' + appointment.patients?.id)} size="sm"
                            variant="outline">View
                        Patient</Button>
                </div>
            </CardFooter>
        </Card>
    )
}