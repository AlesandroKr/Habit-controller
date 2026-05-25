import { useState } from 'react';

const BotonEmergenciaJuego = () => {
    const [clicksRestantes, setClicksRestantes] = useState(25); // Meta de clics
    const [posicion, setPosicion] = useState({ top: '70%', left: '50%' });
    const [juegoTerminado, setJuegoTerminado] = useState(false);

    const moverBoton = () => {
        if (clicksRestantes <= 1) {
            setJuegoTerminado(true);
            return;
        }

        // Generar porcentajes aleatorios entre 10% y 85% para evitar que se corte en los bordes
        const randomTop = Math.floor(Math.random() * 75) + 10;
        const randomLeft = Math.floor(Math.random() * 75) + 10;

        setPosicion({
            top: `${randomTop}%`,
            left: `${randomLeft}%`
        });

        setClicksRestantes(prev => prev - 1);
    };

    const reiniciarJuego = () => {
        setClicksRestantes(25);
        setPosicion({ top: '70%', left: '50%' });
        setJuegoTerminado(false);
    };

    return (
        <div style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            overflow: 'hidden',
            fontFamily: 'sans-serif'
        }}>

            {!juegoTerminado ? (
                <>
                    <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '1.2rem' }}>
                        Objetivo: Caza el botón. Clics restantes: <strong>{clicksRestantes}</strong>
                    </div>
                    <button
                        onClick={moverBoton}
                        style={{
                            border: '1px solid blue',
                            position: 'absolute',
                            top: posicion.top,
                            left: posicion.left,
                            transform: 'translate(-50%, -50%) scale(0.7)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <span className='emergency-btn-back'>
                            <button
                                className='emergency-btn'
                                type="button"
                            >
                                <span className='emergency-btn-front'>
                                    <h1>
                                        <i className="ri-error-warning-line"></i>
                                    </h1>
                                </span>
                            </button>
                        </span>
                    </button>
                </>
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                }}>
                    <h2 style={{ color: '#22c55e', fontSize: '2rem' }}>¡Impulso Domado!</h2>
                    <p style={{ color: '#a3a3a3', marginBottom: '20px' }}>Respiraste, te enfocaste y recuperaste el control.</p>
                    <button
                        onClick={reiniciarJuego}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Probar de nuevo
                    </button>
                </div>
            )}
        </div>
    );
};

export default BotonEmergenciaJuego;