import type {Metadata} from "next";
import {
    Card,
    CardContent,
    CardHeader,

} from "@/components/ui/card"
import Navigation from "@/components/admin/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import * as React from "react";
import dayjs from 'dayjs';
import {Button} from "@/components/ui/button";
import PatientNoteCard from "@/components/admin/patients/patient-note-card";
import {Accordion} from "@/components/ui/accordion";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

export const metadata: Metadata = {
    title: "Patient Details | Hermes",
    description: "Hermes",
};

function getRandomDatesBetween(startDate: string, endDate: string, count: number): dayjs.Dayjs[] {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const diffInMilliseconds = end.diff(start, 'millisecond');

    const randomDates: dayjs.Dayjs[] = [];
    for (let i = 0; i < count; i++) {
        const randomMilliseconds = Math.floor(Math.random() * diffInMilliseconds);
        randomDates.push(start.add(randomMilliseconds, 'millisecond'));
    }

    return randomDates.sort((a, b) => b.valueOf() - a.valueOf());
}

export default function Details() {
    const dates = getRandomDatesBetween('2022-01-01', '2024-01-01', 5);

      return (
        <main className="min-h-screen">
            <Navigation/>

            <div className="p-4 grid grid-cols-12 gap-8">
                <Card className="col-span-6">
                    <CardHeader>
                        <div className="flex flex-row items-start justify-between">
                            <div className="flex flex-row items-center gap-4">
                                <Avatar className="w-20 h-20">
                                    <AvatarImage src="https://github.com/shadcn.png"/>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-xlnp">Jane Doe</span>
                                    <div className="flex flex-row items-center gap-2 text-sm text-gray-400">
                                        <span>Sex: Female</span>
                                        <span>Age: 25</span>
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
                <Card className="col-span-3">
                    <CardHeader>
                        <div className="flex flex-row items-center justify-between">
                            <span className="font-semibold">Prescriptions</span>
                            <Button size="sm">New Prescription</Button>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <div className="flex flex-row items-center justify-between">
                            <span className="font-semibold">Latest Labs</span>
                            <Button size="sm">Order Test</Button>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="col-span-8">
                    <CardHeader>
                        <div className="flex flex-row items-center justify-between">
                            <span className="font-semibold">Patient Notes</span>
                            <Button size="sm">New Note</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <Accordion type="single" collapsible>
                                {dates.map((date, index) => (
                                    <PatientNoteCard key={index} index={'item-' + index} date={date}></PatientNoteCard>
                                ))}
                            </Accordion>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive>
                                            2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">3</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
      );
}
