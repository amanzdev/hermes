'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {createClient} from "@/utils/supabase/client";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import * as React from "react";

interface DeletePatientDialogProps {
    patientId: string
}

export default function DeletePatientDialog({patientId}: DeletePatientDialogProps) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const deletePatient = async () => {
        const { error } = await supabase.from('patients').delete().eq('id', patientId)

        if (error) {
            console.error('Error deleting patient:', error.message)
        } else {
            toast('Patient deleted.')
            router.push('/admin/patients')
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild><Button size="sm" variant="destructive">Delete Patient</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the patient.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deletePatient}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}