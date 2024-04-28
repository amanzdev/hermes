import dayjs from "dayjs";
import {Button} from "@/components/ui/button";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import PatientDashboardCard from "@/components/admin/cards/patient-dashboard-card";
import * as React from "react";
import {createClient} from "@/utils/supabase/server";

export default async function MySchedule() {
    const supabase = createClient()
    const appointments = await supabase.from('appointments').select(`time, patients(id,name), departments(name)`).gte('time', dayjs()).order('time').limit(10)

    return (
        <section className="flex flex-col gap-4 col-span-12">
            <div className="flex flex-row items-start justify-between gap-4">
                <div className="flex flex-col">
                    <span className="font-semibold text-2xl">My Schedule</span>
                    <span className="text-sm">{dayjs().format('DD MMMM YYYY')}</span>
                </div>
                <div className="flex flex-row gap-2">
                    <Button size="sm">Add Appointment</Button>
                </div>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex flex-row w-max space-x-4">
                    {appointments.data?.map((appointment, index) => (
                        <PatientDashboardCard key={index} appointment={appointment}/>
                    ))}
                </div>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>
        </section>
    )
}