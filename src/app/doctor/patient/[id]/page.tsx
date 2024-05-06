import type {Metadata} from "next";
import {Card, CardContent, CardHeader,} from "@/components/ui/card"
import Navigation from "@/components/admin/navigation";
import * as React from "react";
import {Suspense} from "react";
import {Button} from "@/components/ui/button";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import PatientDetails from "@/components/admin/patients/patient-details";
import PatientNotes from "@/components/admin/patients/patient-notes";
import PatientPrescriptions from "@/components/admin/patients/patient-prescriptions";
import PatientNewNoteSheet from "@/components/admin/patients/patient-new-note-sheet";
import PatientAppointmentCard from "@/components/admin/patients/patient-appointment-card";
import PatientNewAppointmentSheet from "@/components/admin/patients/patient-new-appointment-sheet";
import PatientNewPrescriptionSheet from "@/components/admin/patients/patient-new-prescription-sheet";

export const metadata: Metadata = {
    title: "Patient Details | Hermes",
    description: "Hermes",
};

export default async function Details({params}: { params: { id: string } }) {
    const supabase = createClient()

    const {data, error} = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/login')
    }

    const staffProfile = await supabase.from('staff').select().eq('user_id', data.user.id).single();

    return (
        <main className="min-h-screen">
            <Navigation user={data.user} profile={staffProfile.data}/>

            <div className="p-4 grid grid-cols-12 gap-8">
                <Suspense fallback={<p>Loading...</p>}>
                    <PatientDetails className='col-span-6' params={{id: params.id}}/>
                </Suspense>
                <Card className="col-span-3">
                    <CardHeader>
                        <div className="flex flex-row items-center justify-between">
                            <span className="font-semibold">Latest Prescription</span>
                            <PatientNewPrescriptionSheet patientId={params.id} doctorId={staffProfile.data!.id}/>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <PatientPrescriptions patientId={params.id}/>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <div className="flex flex-row items-center justify-between">
                            <span className="font-semibold">Latest Labs</span>
                            <Button size="sm">Order Test</Button>
                        </div>
                    </CardHeader>
                </Card>
                <div className="col-span-8">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-row items-center justify-between">
                                <span className="font-semibold">Patient Notes</span>
                                <PatientNewNoteSheet patientId={params.id} doctorId={staffProfile.data!.id}/>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <PatientNotes patientId={params.id}/>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-4">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-row items-center justify-between">
                                <span className="font-semibold">Appointments</span>
                                <PatientNewAppointmentSheet patientId={params.id} doctorId={staffProfile.data!.id}/>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <PatientAppointmentCard patientId={params.id}/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
