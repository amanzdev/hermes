'use client'

import {Tables} from "../../../../database.types";
import * as React from "react";
import dayjs from "dayjs";

interface PatientPrescriptionRow {
    prescription: Tables<'prescriptions'>
}

export default function PatientPrescriptionRow({prescription}: PatientPrescriptionRow) {
    return (
        <div className="flex flex-col">
            <span
                className="text-xs text-gray-500">Created on {dayjs(prescription.created_at).format('DD MMMM YYYY')} by {prescription.staff.name}</span>
            <div className="border-l pl-4 flex flex-col gap-1">
                {prescription.prescription_line.map((line, index) => (
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