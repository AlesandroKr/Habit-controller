import { useState } from 'react';
import './EmergencyStyle.css'

export default function Emergency() {

    const [count, setCount] = useState(0)

    return (
        <>
            <section id="emergency-panel">
                <span className='emergency-btn-back'>
                    <button
                        className='emergency-btn'
                        type="button"
                        onClick={() => setCount((count) => count + 1)}>
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