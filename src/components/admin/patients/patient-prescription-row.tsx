'use client'

import * as React from "react";
import dayjs from "dayjs";

interface PatientPrescriptionRow {
    prescription: {
        created_at: string;
        dispensed_at: string | null;
        id: number;
        is_recurring: boolean;
        next_dispense: string | null;
        patient_id: string;
        staff_id: string;
        staff: {
            name: string;
        } | null;
        prescription_line: {
            dosage: string;
            dosage_time: string;
            dosage_type: string;
            id: number;
            medicines: {
                name: string;
            }
        }[]
    }
}

export default function PatientPrescriptionRow({prescription}: PatientPrescriptionRow) {
    return (
        <div className="flex flex-col">
            <span
                className="text-xs text-gray-500">Created on {dayjs(prescription.created_at).format('DD MMMM YYYY')} by {prescription.staff?.name}</span>
            <div className="border-l pl-4 flex flex-col gap-1">
                {prescription.prescription_line.map((line) => (
                    <div key={'p-' + prescription.id + '-' + line.id} className="flex flex-row justify-between">
                        <span className="text-sm font-semibold">{line.medicines.name}</span>
                        <span
                            className="text-xs text-gray-500">{line.dosage}, {line.dosage_type}, {line.dosage_time}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}