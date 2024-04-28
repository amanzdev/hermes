import {createClient} from "@/utils/supabase/server";
import PatientPrescriptionRow from "@/components/admin/patients/patient-prescription-row";

interface PatientPrescriptions {
    patientId: string
}

export default async function PatientPrescriptions({patientId}: PatientPrescriptions) {
    const supabase = createClient()
    const {
        data
    } = await supabase.from('prescriptions').select('*, staff(name), prescription_line(dosage, dosage_type, dosage_time, medicines(name))').eq('patient_id', patientId);

    return (
        <>
            {data?.map((prescription, index) => (
                // @ts-ignore
                <PatientPrescriptionRow key={'prescription-' + index} prescription={prescription}/>
            ))}
        </>
    )
}