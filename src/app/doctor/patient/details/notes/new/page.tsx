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
import Tiptap from "@/components/admin/tiptap";

export const metadata: Metadata = {
    title: "New Patient Note | Hermes",
    description: "Hermes",
};

export default function NewPatientNote() {
      return (
        <main className="min-h-screen">
            <Navigation/>

            <div className="p-4 grid grid-cols-12 gap-8">
                <Card className="col-span-12">
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
                </Card>
                <div className="flex flex-col gap-4 col-span-12">
                    <Tiptap/>
                </div>
            </div>
        </main>
      );
}
