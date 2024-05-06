import {createClient} from "@/utils/supabase/server";
import * as React from "react";
import MedicineListTable, {columns} from "@/components/admin/medicines/medicine-list-table";

export default async function MedicineList() {
    const supabase = createClient()
    const { data } = await supabase.from('medicines').select().order('created_at', { ascending: false });

    return (
        <MedicineListTable columns={columns} data={data!} />
    )
}