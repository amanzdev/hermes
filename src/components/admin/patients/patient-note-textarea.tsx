'use client'

import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {ChevronDownIcon, FontBoldIcon, FontItalicIcon, UnderlineIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Underline} from "@tiptap/extension-underline";
import {createClient} from "@/utils/supabase/client";
import * as React from "react";
import {useRouter} from "next/navigation";

interface PatientNoteTextareaProps {
    patientId: string,
    doctorId: string,
}

export default function PatientNoteTextarea({patientId, doctorId}: PatientNoteTextareaProps) {
    const supabase = createClient()
    const router = useRouter()
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert focus:outline-none w-full max-w-none',
            },
        },
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1,2,3]
                }
            }),
            Underline,
        ],
        content: '<p>Hello World! 🌎️</p>',
    })

    const saveNote = async () => {
        if (!editor) return
        const content = editor.getJSON()
        const {data, error} = await supabase.from('patient_notes').insert({
            patient_id: patientId,
            doctor_id: doctorId,
            note: content,
        })

        if (error) {
            console.error(error)
            alert('An error occurred while saving the note. Please try again later.')
        } else {
            router.push(`/doctor/patient/${patientId}`)
        }
    }

    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <span className="font-semibold text-2xl">New Patient Note</span>
                <Button variant="outline" className="border-green-400" onClick={saveNote}>Save</Button>
            </div>

            <Card className="w-full">
                <CardHeader>
                    <div className="flex flex-row gap-2 items-center sticky top-0 left-0 right-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 gap-2">
                                <span
                                    className={editor?.isActive('heading', {level: 1}) ? 'block' : 'hidden'}>Heading 1</span>
                                <span
                                    className={editor?.isActive('heading', {level: 2}) ? 'block' : 'hidden'}>Heading 2</span>
                                <span
                                    className={editor?.isActive('heading', {level: 3}) ? 'block' : 'hidden'}>Heading 3</span>
                                <span className={!editor?.isActive('heading') ? 'block' : 'hidden'}>Normal Text</span>
                                <ChevronDownIcon className="h-4 w-4"/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => editor?.chain().focus().setParagraph().run()}>Normal
                                    Text</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => editor?.chain().focus().toggleHeading({level: 1}).run()}>Heading
                                    1</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => editor?.chain().focus().toggleHeading({level: 2}).run()}>Heading
                                    2</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => editor?.chain().focus().toggleHeading({level: 3}).run()}>Heading
                                    3</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="icon" onClick={() => editor?.chain().focus().toggleBold().run()}><FontBoldIcon
                            className="h-4 w-4"/></Button>
                        <Button size="icon" onClick={() => editor?.chain().focus().toggleItalic().run()}><FontItalicIcon
                            className="h-4 w-4"/></Button>
                        <Button size="icon"
                                onClick={() => editor?.chain().focus().toggleUnderline().run()}><UnderlineIcon
                            className="h-4 w-4"/></Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <EditorContent editor={editor}/>
                </CardContent>
            </Card>
        </>
    )
}