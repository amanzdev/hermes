'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import {useFieldArray, useForm} from "react-hook-form"
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
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";

interface PatientNewNoteAppointmentProps {
    patientId: string,
    doctorId: string,
}

const prescriptionLineSchema = z.object({
    medicine_id: z.string(),
    dosage: z.string(),
    dosage_type: z.string(),
    dosage_time: z.string(),
})

const formSchema = z.object({
    is_recurring: z.boolean(),
    next_dispense: z.date(),
    prescription: z.array(prescriptionLineSchema),
})

export default function PatientNewPrescriptionSheet({patientId, doctorId}: PatientNewNoteAppointmentProps) {
    const [medicines, setMedicines] = React.useState<{ id:string,name:string }[]>([]);
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        supabase.from('medicines').select('id, name').then(({data, error}) => {
            if (error) {
                console.error(error);
            } else {
                setMedicines(data);
            }
        });
    }, [supabase])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "prescription",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const {data, error} = await supabase.from('prescriptions').insert({
            patient_id: patientId,
            staff_id: doctorId,
            is_recurring: values.is_recurring,
            next_dispense: dayjs(values.next_dispense).toISOString(),
        }).select('id');

        if (error) {
            console.error(error);
        } else {
            for (const line of values.prescription) {
                const {error} = await supabase.from('prescription_line').insert({
                    prescription_id: data[0].id,
                    medicine_id: line.medicine_id,
                    dosage: line.dosage,
                    dosage_type: line.dosage_type,
                    dosage_time: line.dosage_time,
                });
            }

            if(error) {
                console.error(error);
            } else {
                setOpen(false);
                toast('Prescription created.')
                router.refresh();
            }
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild><Button size="sm">New Prescription</Button></SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>New Prescription</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col my-4 gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="is_recurring"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center gap-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>
                                            Recurring
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="next_dispense"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Next Dispense</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row justify-between items-center gap-4">
                                    <span>Add Medicine</span>
                                    <Button type="button" size="sm" variant="outline" onClick={() => append({
                                        medicine_id: "",
                                        dosage: "",
                                        dosage_type: "", dosage_time: ""})}>Add</Button>
                                </div>
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex flex-col mb-4 gap-2">
                                        <div className="flex flex-row justify-end gap-4">
                                            <Button type="button" size="sm" variant="outline" onClick={() => remove(index)}>Remove</Button>
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name={`prescription.${index}.medicine_id`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Medicine</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a medicine"/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                               {medicines.map((med) => (
                                                                   <SelectItem key={med.id}
                                                                               value={med.id}>{med.name}</SelectItem>
                                                               ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`prescription.${index}.dosage`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Dosage</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`prescription.${index}.dosage_type`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Dosage Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select dosage type"/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="oral">Oral</SelectItem>
                                                            <SelectItem value="topical">Topical</SelectItem>
                                                            <SelectItem value="injection">Injection</SelectItem>
                                                            <SelectItem value="inhalation">Inhalation</SelectItem>
                                                            <SelectItem value="ophtalmic">Ophtalmic</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`prescription.${index}.dosage_time`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Dosage Time</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select dosage time"/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="daily">Daily</SelectItem>
                                                            <SelectItem value="2x daily">Twice Daily</SelectItem>
                                                            <SelectItem value="3x daily">Three Times Daily</SelectItem>
                                                            <SelectItem value="4x daily">Four Times Daily</SelectItem>
                                                            <SelectItem value="5x daily">Five Times Daily</SelectItem>
                                                            <SelectItem value="every 3hr">Every 3 Hours</SelectItem>
                                                            <SelectItem value="every 4hr">Every 4 Hours</SelectItem>
                                                            <SelectItem value="every 6hr">Every 6 Hours</SelectItem>
                                                            <SelectItem value="every 8hr">Every 8 Hours</SelectItem>
                                                            <SelectItem value="every 12hr">Every 12 Hours</SelectItem>
                                                            <SelectItem value="bedtime">Bedtime</SelectItem>
                                                            <SelectItem value="with meals">With Meals</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>


                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    )
}