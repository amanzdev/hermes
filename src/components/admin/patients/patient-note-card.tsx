'use client'

import {AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import dayjs from "dayjs";
import {generateHTML} from "@tiptap/core";
import {useMemo} from "react";
import StarterKit from "@tiptap/starter-kit";
import {Underline} from "@tiptap/extension-underline";

interface PatientNoteCardProps {
    index: string
    note: any
}

export default function PatientNoteCard({index, note}: PatientNoteCardProps) {
    const output = useMemo(() => {
        return generateHTML(note.note, [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3]
                }
            }),
            Underline,
        ])
    }, [note])

    return (
        <AccordionItem value={index}>
            <AccordionTrigger>{dayjs(note.created_at).format('DD MMMM YYYY - hh:mmA')} | Written
                by {note.staff.name}</AccordionTrigger>
            <AccordionContent>
                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{__html: output}}></div>
            </AccordionContent>
        </AccordionItem>
    )
}