"use client";

import { Cloudy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const WeatherClockWidget = () => {
    const [time, setTime] = useState<Date | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setTime(new Date());
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);


    if (!isMounted || !time) {
        return (
            <div className="flex items-center justify-end text-white/90 gap-4">
                <div className="flex items-start">
                    <span className="text-5xl font-light">16</span>
                    <span className="text-2xl font-light mt-1">°</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-3xl font-medium">London</span>
                    <span className="text-sm text-white/70">--:-- - --------, - --- ''--</span>
                </div>
                <div className="flex flex-col items-center ml-2">
                    <Cloudy size={36} className="text-white/80"/>
                    <span className="text-sm font-medium text-white/80">Cloudy</span>
                </div>
            </div>
        );
    }

    const formattedTime = format(time, 'HH:mm');
    const formattedDate = format(time, "EEEE, d MMM ''yy");

    return (
        <div className="flex items-center justify-end text-white/90 gap-4">
            <div className="flex items-start">
                <span className="text-5xl font-light">16</span>
                <span className="text-2xl font-light mt-1">°</span>
            </div>
            <div className="flex flex-col">
                <span className="text-3xl font-medium">London</span>
                <span className="text-sm text-white/70">{formattedTime} - {formattedDate}</span>
            </div>
            <div className="flex flex-col items-center ml-2">
                <Cloudy size={36} className="text-white/80"/>
                <span className="text-sm font-medium text-white/80">Cloudy</span>
            </div>
        </div>
    );
};

export default WeatherClockWidget;