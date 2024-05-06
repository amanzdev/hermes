import {createClient} from "@/utils/supabase/server";
import * as React from "react";
import StaffListTable, {columns} from "@/components/admin/staffs/staff-list-table";
import {SelectQueryError} from "@supabase/postgrest-js/src/select-query-parser";

export type StaffWithDepartment = {
    id: string;
    name: string;
    phone_num: string|null;
    email: string|null;
    address: string|null;
    departments: { name: string };
}

export default async function StaffList() {
    const supabase = createClient()
    const { data } = await supabase.from('staff').select('*, departments(name)').order('created_at', { ascending: false });

    return (
        <StaffListTable columns={columns} data={data!} />
    )
}