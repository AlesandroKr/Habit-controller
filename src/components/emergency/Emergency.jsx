import { useState, useRef } from 'react';
import './EmergencyStyle.css'

export default function Emergency() {

    const [count, setCount] = useState(0)

    const sound = useRef(new Audio('/click.mp3'));

    const pressed = () => {
        sound.current.currentTime = 0;
        sound.current.play();
        setCount((count) => count + 1)
    };

    return (
        <>
            <section id="emergency-panel">
                <span className='emergency-btn-back'>
                    <button
                        className='emergency-btn'
                        type="button"
                        onClick={pressed}>
                        <span className='emergency-btn-front'>
                            <h1>
                                <i className="ri-error-warning-line"></i>
                            </h1>
                        </span>
                    </button>
                </span>
                <div>
                    <h1>An emergency?</h1>
                    <p>
                        Press <code> ↑ this button ↑</code> if you are in risk to fall.
                    </p>
                </div>
                <span className='counter'>
                    You pressed it {count} times.
                </span>
            </section>


        </>
    );
}