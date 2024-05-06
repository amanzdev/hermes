import type {Metadata} from "next";
import Navigation from "@/components/admin/navigation";
import * as React from "react";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import StaffList from "@/components/admin/staffs/staff-list";

export const metadata: Metadata = {
    title: "Staffs | Hermes",
    description: "Hermes",
};

export default async function Medicines() {
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
                <div className="col-span-full">
                    <StaffList/>
                </div>
            </div>
        </main>
    );
}
