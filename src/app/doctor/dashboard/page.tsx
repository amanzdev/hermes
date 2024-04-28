import type {Metadata} from "next";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import Navigation from "@/components/admin/navigation";
import * as React from "react";
import {Suspense} from "react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import MySchedule from "@/components/admin/dashboard/my-schedule";

export const metadata: Metadata = {
    title: "Dashboard | Hermes",
    description: "Hermes",
};

export default async function Dashboard() {
    const supabase = createClient()

    const {data, error} = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/login')
    }

    const staffProfile = await supabase.from('staff').select().eq('user_id', data.user.id).single()

  return (
    <main className="min-h-screen">
        <Navigation user={data.user} profile={staffProfile.data}/>

        <div className="p-4 grid grid-cols-12 gap-8">
            <Suspense fallback={<p>Loading feed...</p>}>
                <MySchedule/>
            </Suspense>
            <section className="flex flex-col gap-4 col-span-4">
                <div className="flex flex-row items-start justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="font-semibold text-2xl">Active Labs</span>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button size="sm">Order Test</Button>
                    </div>
                </div>
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Lab Type</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Jane Doe</TableCell>
                                <TableCell>HBA1C</TableCell>
                                <TableCell><Badge variant="outline">Processing</Badge></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>
        </div>
    </main>
  );
}
