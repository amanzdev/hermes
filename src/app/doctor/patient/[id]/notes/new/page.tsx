import type {Metadata} from "next";
import Navigation from "@/components/admin/navigation";
import * as React from "react";
import {Suspense} from "react";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import PatientDetails from "@/components/admin/patients/patient-details";

export const metadata: Metadata = {
    title: "New Patient Note | Hermes",
    description: "Hermes",
};

export default async function NewPatientNote({params}: { params: { id: string } }) {
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
                <Suspense fallback={<p>Loading feed...</p>}>
                    <PatientDetails className="col-span-full" params={{id: params.id}}/>
                </Suspense>
                <div className="flex flex-col gap-4 col-span-12">
                </div>
            </div>
        </main>
    );
}
