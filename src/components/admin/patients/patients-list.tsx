import {createClient} from "@/utils/supabase/server";
import PatientsListTable, {columns} from "@/components/admin/patients/patients-list-table";
import * as React from "react";

export default async function PatientsList() {
    const supabase = createClient()
    const { data } = await supabase.from('patients').select().order('created_at', { ascending: false });

    return (
        <PatientsListTable columns={columns} data={data!} />
    )
}