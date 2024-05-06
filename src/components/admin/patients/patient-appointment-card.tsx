import {createClient} from "@/utils/supabase/server";
import React from "react";
import PatientAppointmentCalendar from "@/components/admin/patients/patient-appointment-calendar";

interface PatientAppointmentCardProps {
    patientId: string,
}

export default async function PatientAppointmentCard({patientId}: PatientAppointmentCardProps) {
    const supabase = createClient()
    const {data, error} = await supabase.from('appointments').select('time, staff(name)').eq('patient_id', patientId);
    return (
        <div className="flex flex-col">
            {data && <PatientAppointmentCalendar dates={data}/> }
        </div>
    )
}