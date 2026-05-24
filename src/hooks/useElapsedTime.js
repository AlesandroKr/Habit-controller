import { useState, useEffect } from "react";
import { intervalToDuration } from 'date-fns';

function calcularDiferencia(startDate) {

    if (!startDate) return {
        años: 0, meses: 0, dias: 0, horas: 0, minutos: 0, segundos: 0
    };

    const duration = intervalToDuration({
        start: new Date(startDate),
        end: new Date()
    });

    return {
        años: duration.years,
        meses: duration.months,
        dias: duration.days,
        horas: duration.hours,
        minutos: duration.minutes,
        segundos: duration.seconds,
    };
}

export function useElapsedTime(startDate) {
    const [elapsed, setElapsed] = useState(calcularDiferencia(startDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsed(calcularDiferencia(startDate));
        }, 1000);

        return () => clearInterval(interval);
    }, [startDate]);

    return elapsed;
}