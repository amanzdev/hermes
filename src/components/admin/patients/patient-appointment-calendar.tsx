'use client'

import {Calendar} from "@/components/ui/calendar";
import React from "react";
import dayjs from "dayjs";

interface PatientAppointmentCardProps {
    dates: { time: string, staff: { name: string }[] }[],
}

export default function PatientAppointmentCalendar({dates}: PatientAppointmentCardProps) {
    const [staff, setStaff] = React.useState<{ time: string, staff: { name: string }[] } | undefined>();
    const initialDays: Date[] = dates.map((date: any) => new Date(date.time));
    const [date, setDate] = React.useState<Date[] | undefined>(initialDays)

    const onDayClick = (day: Date) => {
        const staff = dates.find((date: any) => new Date(date.time).toDateString() === day.toDateString());
        if (staff) {
            setStaff(staff);
        } else {
            setStaff(undefined);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {staff && (
                <div className="flex flex-col p-4 border rounded-md">
                    <span className="text-sm font-semibold">Appointment Details</span>
                    <span className="mt-2 text-sm">{dayjs(staff.time).format('DD MMM YYYY - hh:mmA')}</span>
                    <span className="text-sm">With {staff.staff.name}</span>
                </div>
            )}
            <Calendar
                mode="multiple"
                selected={date}
                onDayClick={onDayClick}
                numberOfMonths={2} pagedNavigation
                className="w-full"
            />
        </div>
    )
}