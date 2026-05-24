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
        años: duration.years ?? 0,
        meses: duration.months ?? 0,
        dias: duration.days ?? 0,
        horas: duration.hours ?? 0,
        minutos: duration.minutes ?? 0,
        segundos: duration.seconds ?? 0,
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