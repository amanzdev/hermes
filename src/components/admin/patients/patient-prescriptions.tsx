import {createClient} from "@/utils/supabase/server";
import {QueryData} from "@supabase/supabase-js";
import PatientPrescriptionRow from "@/components/admin/patients/patient-prescription-row";

interface PatientPrescriptions {
    patientId: string
}

export default async function PatientPrescriptions({patientId}: PatientPrescriptions) {
    const supabase = createClient()
    const query = supabase.from('prescriptions').select('*, staff(name), prescription_line(dosage, dosage_type, dosage_time, medicines(name))').eq('patient_id', patientId)
    type Prescription = QueryData<typeof query>;

    const {data, error} = await query;
    const prescriptions: Prescription | null = data;

    return (
        <>
            {prescriptions?.map((prescription, index) => (
                <PatientPrescriptionRow key={'prescription-' + index} prescription={prescription}/>
            ))}
        </>
    )
}