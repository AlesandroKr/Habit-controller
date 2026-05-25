import { useState, useRef } from 'react';
import './EmergencyStyle.css'

export default function Emergency() {

    const [count, setCount] = useState(0)

    const sound = useRef(new Audio('/click.mp3'));

    const pressed = () => {
        sound.current.currentTime = 0;
        sound.current.play();
        setCount((count) => count + 1)
        moverBoton();
    };

    //minigame
    const [clicksRestantes, setClicksRestantes] = useState(25); // Meta de clics
    const [posicion, setPosicion] = useState({ top: '35%', left: '50%' });
    const [juegoTerminado, setJuegoTerminado] = useState(false);
    const [juegoSalir, setJuegoSalir] = useState(true);


    const moverBoton = () => {
        if (clicksRestantes <= 1) {
            setJuegoTerminado(true);
            return;
        }

        setJuegoSalir(false)
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
        setPosicion({ top: '35%%', left: '50%' });
        setJuegoTerminado(false);
    };

    const salirJuego = () => {
        setClicksRestantes(25);
        setPosicion({ top: '35%%', left: '50%' });
        setJuegoTerminado(false);
        setJuegoSalir(true)
    };

    const escalaActual = juegoSalir ? 'scale(1)' : 'scale(0.55)';

    return (
        <>
            <section id="emergency-panel">
                {juegoSalir && (<>
                    <div className='emergency-description'>
                        <div>
                            <h1>An emergency?</h1>
                            <p>
                                Press <code> ↑ this button ↑</code> if you are in risk to fall.
                            </p>
                        </div>
                        <span className='counter'>
                            You pressed it {count} times.
                        </span>
                    </div>

                </>)}

                {!juegoTerminado ?
                    (
                        <>{!juegoSalir && (
                            <div className='emergency-btn-goal'>
                                <h3>Objetivo: Caza el botón</h3> 
                                <p>
                                    Clics restantes: <strong>{clicksRestantes}</strong>
                                </p>
                            </div>
                        )}
                            <button
                                className='emergency-btn-back'
                                onClick={pressed}
                                style={{
                                    position: 'absolute',
                                    top: posicion.top,
                                    left: posicion.left,
                                    transform: `translate(-50%, -50%) ${escalaActual}`,
                                    cursor: 'pointer',
                                    transition: juegoSalir ? 'transform 0.3s ease' : 'all 0.2s ease-out'
                                }}>
                                <div
                                    className='emergency-btn'
                                    type="button"
                                >
                                    <span className='emergency-btn-front'>
                                        <h1><i className="ri-error-warning-line"></i></h1>
                                    </span>
                                </div>
                            </button>
                        </>
                    ) :
                    (
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
                            <button
                                onClick={salirJuego}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Salir
                            </button>
                        </div>
                    )

                }
            </section>


        </>
    );
}