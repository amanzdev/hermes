import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {calculateAge} from "@/utils/dateutils";
import dayjs from "dayjs";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {createClient} from "@/utils/supabase/server";
import {cn} from "@/lib/utils";

export default async function PatientDetails({params, className}: {
    params: { id: string },
    className?: string | undefined
}) {
    const supabase = createClient()
    const patientProfile = await supabase.from('patients').select().eq('id', params.id).single();

    return (
        <Card className={cn(className)}>
            <CardHeader>
                <div className="flex flex-row items-start justify-between">
                    <div className="flex flex-row items-center gap-4">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-xlnp">{patientProfile.data.name}</span>
                            <div className="flex flex-row items-center gap-2 text-sm text-gray-400">
                                <span>Sex: <span className="capitalize">{patientProfile.data.gender}</span></span>
                                <span>Age: {calculateAge(dayjs(patientProfile.data.birthdate).toDate())}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button size="sm">Edit Patient</Button>
                        <Button size="sm" variant="destructive">Delete Patient</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-400">As of {dayjs().format('MMMM D, YYYY')}</span>
                    <div className="flex flex-row items-stretch gap-4">
                        <div className="flex flex-col items-center justify-center gap-1">
                            <span className="text-2xl font-semibold">95.1</span>
                            <span className="text-sm text-gray-400">Weight (kg)</span>
                        </div>
                        <div className="w-[1px] bg-gray-400"></div>
                        <div className="flex flex-col items-center justify-center gap-1">
                            <span className="text-2xl font-semibold">168.9</span>
                            <span className="text-sm text-gray-400">Height (cm)</span>
                        </div>
                        <div className="w-[1px] bg-gray-400"></div>
                        <div className="flex flex-col items-center justify-center gap-1">
                                    <span
                                        className="text-2xl font-semibold">{(95.1 / ((168.9 / 100) ** 2)).toFixed(1)}</span>
                            <span className="text-sm text-gray-400">BMI</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}