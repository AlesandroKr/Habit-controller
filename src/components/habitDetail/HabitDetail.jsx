import './HabitDetailStyle.css'
import { useElapsedTime } from '../../hooks/useElapsedTime';
import { useState } from 'react';

export default function HabitDetail({ habit, diaryHabit, setDiaryHabits, setHabits, setSelectedHabit, setSelectedDiaryHabit, editing, setEditing }) {

    const activeHabit = diaryHabit || habit;
    const { años, meses, dias, horas, minutos, segundos } = useElapsedTime(activeHabit?.startDate);

    const [editData, setEditData] = useState({
        meta: activeHabit?.meta || 0,
        startDate: activeHabit?.startDate || "",
        text: activeHabit?.text || "",
    });

    if (!activeHabit) {
        return (
            <div id="habit-detail-panel">
                <h2>Habit Info</h2>
                <span>Seleccioná un hábito para ver su información</span>
            </div>
        );
    }

    const startEditing = () => {
        setEditing(true);
        setEditData({
            meta: activeHabit.meta || 0,
            startDate: activeHabit.startDate || "",
            text: activeHabit.text || "",
        });
    };

    const saveNewDetail = () => {
        const updatedHabit = { ...activeHabit, ...editData };
        if (!diaryHabit) {
            setHabits(prev => prev.map(h => h.id === activeHabit.id ? updatedHabit : h));
            setSelectedHabit(updatedHabit);
        }
        else {
            setDiaryHabits(prev => prev.map(h => h.id === activeHabit.id ? updatedHabit : h));
            setSelectedDiaryHabit(updatedHabit);
        }
        setEditing(false);
    };

    const pad = (n) => String(n).padStart(2, '0');

    // VISTA 1: SI ES HÁBITO DEL DIARIO
    if (diaryHabit) {
        return (
            <div id="habit-detail-panel" >
                {editing ?
                    (
                        <input type="text" value={editData.text || ""} onChange={(e) => setEditData(prev => ({ ...prev, text: e.target.value }))} />
                    ) :
                    (
                        <h2 className='habit-title'>{diaryHabit.text}</h2>
                    )
                }
                <div>
                    Datos Diario
                    {!editing && <button onClick={startEditing}>Edit</button>}
                    <p>Registrado: {new Date(diaryHabit.createdAt).toLocaleString()}</p>
                    {editing ? (
                        <input type="number" value={editData.meta || 0} onChange={(e) => setEditData(prev => ({ ...prev, meta: e.target.value }))} />
                    ) : (
                        <p>Meta: {diaryHabit.meta}</p>
                    )}
                    {editing && <button onClick={saveNewDetail}>save</button>}
                </div>
            </div>
        );
    }

    // VISTA 2: SI ES HÁBITO NORMAL (LLEVA EL TIMER)
    return (
        <div id="habit-detail-panel" className="panel-general">
            {editing ? (
                <input type="text" value={editData.text || ""} onChange={(e) => setEditData(prev => ({ ...prev, text: e.target.value }))} />
            ) : (
                <h2 className='habit-title'>{habit.text}</h2>
            )}
            <span className='habit-timer-detail'>
                {años > 0 && <>{pad(años)}a : </>}
                {meses > 0 && <>{pad(meses)}m : </>}
                {dias > 0 && <>{pad(dias)}d : </>}
                {horas > 0 && <>{pad(horas)}h : </>}
                {pad(minutos)}m : {pad(segundos)}s
            </span>
            <div>
                Datos General
                {!editing && <button onClick={startEditing}>Edit</button>}
                {editing ? (
                    <input type="datetime-local" value={editData.startDate || ""} onChange={(e) => setEditData(prev => ({ ...prev, startDate: e.target.value }))} />
                ) : (
                    <p>Inicio: {new Date(habit.startDate).toLocaleString()}</p>
                )}
                <p>Registrado: {new Date(habit.createdAt).toLocaleString()}</p>
                {editing ? (
                    <input type="number" value={editData.meta || 0} onChange={(e) => setEditData(prev => ({ ...prev, meta: e.target.value }))} />
                ) : (
                    <p>Meta: {habit.meta}</p>
                )}
                {editing && <button onClick={saveNewDetail}>save</button>}
            </div>
        </div>
    );
}