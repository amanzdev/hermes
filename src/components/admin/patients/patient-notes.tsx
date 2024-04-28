import {Accordion} from "@/components/ui/accordion";
import PatientNoteCard from "@/components/admin/patients/patient-note-card";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import * as React from "react";
import {createClient} from "@/utils/supabase/server";

interface PatientNotesProps {
    patientId: string,
}

export default async function PatientNotes({patientId}: PatientNotesProps) {
    const supabase = createClient()

    const patientNotes = await supabase.from('patient_notes').select('*, staff!inner(name)').eq('patient_id', patientId).order('created_at', {ascending: false}).limit(10)

    return (
        <div className="flex flex-col gap-4">
            <Accordion type="single" collapsible>
                {patientNotes.data?.map((note, index) => (
                    <PatientNoteCard key={index} index={'item-' + index} note={note}></PatientNoteCard>
                ))}
            </Accordion>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#"/>
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
                        <PaginationEllipsis/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#"/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}