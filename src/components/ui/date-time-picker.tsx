"use client";

import * as React from "react";
import { format } from "date-fns";
import { ClockIcon, CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {TimePickerInput} from "@/components/ui/time-picker-input";
import {Label} from "@/components/ui/label";

export function DateTimePicker() {
    const minuteRef = React.useRef<HTMLInputElement>(null);
    const hourRef = React.useRef<HTMLInputElement>(null);
    const secondRef = React.useRef<HTMLInputElement>(null);
    const [date, setDate] = React.useState<Date>();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP HH:mm:ss") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
                <div className="p-3 border-t border-border">
                    <div className="flex items-end gap-2">
                        <div className="grid gap-1 text-center">
                            <Label htmlFor="hours" className="text-xs">
                                Hours
                            </Label>
                            <TimePickerInput
                                picker="hours"
                                date={date}
                                setDate={setDate}
                                ref={hourRef}
                                onRightFocus={() => minuteRef.current?.focus()}
                            />
                        </div>
                        <div className="grid gap-1 text-center">
                            <Label htmlFor="minutes" className="text-xs">
                                Minutes
                            </Label>
                            <TimePickerInput
                                picker="minutes"
                                date={date}
                                setDate={setDate}
                                ref={minuteRef}
                                onLeftFocus={() => hourRef.current?.focus()}
                                onRightFocus={() => secondRef.current?.focus()}
                            />
                        </div>
                        <div className="grid gap-1 text-center">
                            <Label htmlFor="seconds" className="text-xs">
                                Seconds
                            </Label>
                            <TimePickerInput
                                picker="seconds"
                                date={date}
                                setDate={setDate}
                                ref={secondRef}
                                onLeftFocus={() => minuteRef.current?.focus()}
                            />
                        </div>
                        <div className="flex h-10 items-center">
                            <ClockIcon className="ml-2 h-4 w-4"/>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}