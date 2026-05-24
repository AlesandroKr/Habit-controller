import './HabitDetailStyle.css'

import { useElapsedTime } from '../../hooks/useElapsedTime';
import { useState } from 'react';

export default function HabitDetail({ habit, setHabits, setSelectedHabit, editing, setEditing }) {


    const { años, meses, dias, horas, minutos, segundos } = useElapsedTime(habit?.startDate);

    const [editData, setEditData] = useState({});

    const startEditing = () => {
        setEditing(true);
        setEditData({
            meta: habit.meta || 0,
            startDate: habit.startDate || "",
            text: habit.text || "",
        });
    };

    const saveNewDetail = () => {
        const updatedHabit = { ...habit, ...editData };
        setHabits(prev => prev.map(h => h.id === habit.id ? updatedHabit : h));
        setSelectedHabit(updatedHabit);
        setEditing(false);
    };

    if (!habit) {
        return (
            <div id="habit-detail-panel">
                <h2>Habit Info</h2>
                <span>Seleccioná un hábito para ver su información</span>
            </div>
        );
    }

    const pad = (n) => String(n).padStart(2, '0');

    return (
        <div id="habit-detail-panel">
            {editing ? <input
                type="text"
                value={editData.text || ""}
                onChange={(e) => setEditData(prev => ({ ...prev, text: e.target.value }))}
            /> : <h2 className='habit-title'>{habit.text}</h2>}
            <span className='habit-timer-detail'>
                {años > 0 && <>{pad(años)}a : </>}
                {meses > 0 && <>{pad(meses)}m : </>}
                {dias > 0 && <>{pad(dias)}d : </>}
                {horas > 0 && <>{pad(horas)}h : </>}
                {pad(minutos)}m : {pad(segundos)}s
            </span>
            <div>
                Datos
                {!editing ? <button onClick={startEditing}>Edit</button> : <></>}

                {editing ? <input
                    type="datetime-local"
                    value={editData.startDate || ""}
                    onChange={(e) => setEditData(prev => ({ ...prev, startDate: e.target.value }))}
                /> : <p>Inicio: {new Date(habit.startDate).toLocaleString()}</p>}


                <p>Registrado: {new Date(habit.createdAt).toLocaleString()}</p>
                {editing ? <input
                    type="number"
                    value={editData.meta || 0}
                    onChange={(e) => setEditData(prev => ({ ...prev, meta: e.target.value }))}
                /> : (<p>Meta: {habit.meta}</p>)

                }
                {editing &&
                    <button onClick={saveNewDetail}>
                        save
                    </button>
                }
            </div>
        </div>
    );
}