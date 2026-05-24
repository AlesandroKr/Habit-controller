import { useState, useEffect } from "react";

export function calcularDiferencia(startDate) {
    const diff = Date.now() - new Date(startDate).getTime();

    const segundos = Math.floor(diff / 1000) % 60;
    const minutos  = Math.floor(diff / 1000 / 60) % 60;
    const horas    = Math.floor(diff / 1000 / 60 / 60) % 24;
    const dias     = Math.floor(diff / 1000 / 60 / 60 / 24);

    return { dias, horas, minutos, segundos };
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