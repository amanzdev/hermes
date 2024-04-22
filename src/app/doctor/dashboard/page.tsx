import type {Metadata} from "next";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Navigation from "@/components/admin/navigation";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import * as React from "react";
import {Badge} from "@/components/ui/badge";
import dayjs from 'dayjs';
import {Button} from "@/components/ui/button";
import PatientDashboardCard from "@/components/admin/cards/patient-dashboard-card";

export const metadata: Metadata = {
    title: "Dashboard | Hermes",
    description: "Hermes",
};

export default function Dashboard() {

  return (
    <main className="min-h-screen">
        <Navigation/>

        <div className="p-4 grid grid-cols-12 gap-8">
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
                        {Array.from({length: 10}).map((_, index) => (
                            <PatientDashboardCard key={index}/>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal"/>
                </ScrollArea>
            </section>
            <section className="flex flex-col gap-4 col-span-4">
                <div className="flex flex-row items-start justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="font-semibold text-2xl">Active Labs</span>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button size="sm">Order Test</Button>
                    </div>
                </div>
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Lab Type</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Jane Doe</TableCell>
                                <TableCell>HBA1C</TableCell>
                                <TableCell><Badge variant="outline">Processing</Badge></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>
        </div>
    </main>
  );
}
