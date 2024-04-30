'use client'

import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {createClient} from "@/utils/supabase/client";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Underline} from "@tiptap/extension-underline";
import {toast} from "sonner";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ChevronDownIcon, FontBoldIcon, FontItalicIcon, UnderlineIcon} from "@radix-ui/react-icons";
import * as React from "react";
import {useState} from "react";

interface PatientNewNoteSheetProps {
    patientId: string,
    doctorId: string,
}

export default function PatientNewNoteSheet({patientId, doctorId}: PatientNewNoteSheetProps) {
    const supabase = createClient();
    const [open, setOpen] = useState(false);
    const [showError, setShowError] = useState(false);

    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert focus:outline-none w-full max-w-none',
            },
        },
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3]
                }
            }),
            Underline,
        ],
        content: '<p>Hello World! 🌎️</p>',
    })

    const saveNote = async () => {
        if (!editor) return
        const content = editor.getJSON()
        const {error} = await supabase.from('patient_notes').insert({
            patient_id: patientId,
            doctor_id: doctorId,
            note: content,
        })

        if (error) {
            setShowError(true);
        } else {
            setOpen(false);
            toast('Note saved.')
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger><Button size="sm">New Note</Button></SheetTrigger>
            <SheetContent className="sm:!max-w-6xl">
                <SheetHeader>
                    <SheetTitle>New Patient Note</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col my-4 gap-4">
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
                                        <span
                                            className={!editor?.isActive('heading') ? 'block' : 'hidden'}>Normal Text</span>
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
                                <Button size="icon"
                                        onClick={() => editor?.chain().focus().toggleBold().run()}><FontBoldIcon
                                    className="h-4 w-4"/></Button>
                                <Button size="icon"
                                        onClick={() => editor?.chain().focus().toggleItalic().run()}><FontItalicIcon
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

                    <div className="flex flex-row items-center justify-between">
                        {showError ? <p className="text-red-500">An error occurred while saving the note.</p> :
                            <div></div>}
                        <Button size="sm" onClick={saveNote}>Save</Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}