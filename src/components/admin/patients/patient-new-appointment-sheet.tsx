'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {createClient} from "@/utils/supabase/client";
import * as React from "react";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import dayjs from "dayjs";
import {TimePicker} from "@/components/ui/time-picker";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

interface PatientNewNoteAppointmentProps {
    patientId: string,
    doctorId: string,
}

const formSchema = z.object({
    department: z.string({
        message: 'Please select a department',
    }),
    time: z.date({
        message: 'Please select a valid date and time',
    }),
})

export default function PatientNewAppointmentSheet({patientId, doctorId}: PatientNewNoteAppointmentProps) {
    const [departments, setDepartments] = React.useState<{ id:string,name:string }[]>([]);
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        supabase.from('departments').select('id, name').then(({data, error}) => {
            if (error) {
                console.error(error);
            } else {
                setDepartments(data);
            }
        });
    }, [supabase])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const {error} = await supabase.from('appointments').insert({
            patient_id: patientId,
            doctor_id: doctorId,
            department_id: values.department,
            time: dayjs(values.time).toISOString(),
        });

        if (error) {
            console.error(error);
        } else {
            setOpen(false);
            toast('Appointment Scheduled.')
            form.reset();
            router.refresh();
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild><Button size="sm">Schedule Appointment</Button></SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>New Appointment</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col my-4 gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a department" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {departments.map((department) => (
                                                    <SelectItem key={department.id} value={department.id}>{department.name}</SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-left">Date and Time</FormLabel>
                                        <Popover>
                                            <FormControl>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-[280px] justify-start text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? (
                                                            format(field.value, "dd MMM yyyy - HH:mm:ss")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                            </FormControl>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={dayjs(field.value).toDate()}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                                <div className="p-3 border-t border-border">
                                                    <TimePicker
                                                        setDate={field.onChange}
                                                        date={field.value}
                                                    />
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    )
}