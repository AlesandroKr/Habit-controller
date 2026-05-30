import './HabitDetailStyle.css'
import { useState } from 'react';
import DiaryHabitView from './DiaryHabitView/DiaryHabitView';
import GeneralHabitView from './GeneralHabitView/GeneralHabitView';

export default function HabitDetail({ habit, diaryHabit, setDiaryHabits, setHabits, setSelectedHabit, setSelectedDiaryHabit, editing, setEditing }) {

    const activeHabit = diaryHabit || habit;


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


    // VISTA 1: SI ES HÁBITO DEL DIARIO
    if (diaryHabit) {
        return (
            <DiaryHabitView
                editing={editing}
                editData={editData}
                setEditData={setEditData}
                startEditing={startEditing}
                saveNewDetail={saveNewDetail}
                diaryHabit={diaryHabit}
                setDiaryHabits={setDiaryHabits}
                setSelectedDiaryHabit={setSelectedDiaryHabit}
            />
        );
    }

    // VISTA 2: SI ES HÁBITO NORMAL
    return (
        <GeneralHabitView
            editing={editing}
            editData={editData}
            setEditData={setEditData}
            startEditing={startEditing}
            saveNewDetail={saveNewDetail}
            habit={habit}
            activeHabit={activeHabit}
        />
    );
}
