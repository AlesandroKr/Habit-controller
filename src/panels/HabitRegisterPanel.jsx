import { useState, useEffect } from 'react';
import Habits from '../components/habitList/Habits'
import HabitDetail from '../components/habitDetail/HabitDetail'
import HabitDiary from '../components/habitDiary/HabitDiary';

import './HabitsRegisterPanelStyle.css'

export default function HabitRegisterPanel() {


    //habits
    const [habits, setHabits] = useState(() => {
        const saved = localStorage.getItem("habits");
        return saved ? JSON.parse(saved) : [];
    });
    const [selectedHabit, setSelectedHabit] = useState(null);




    const [editing, setEditing] = useState(false);


    //diaryhabit
    const [diaryHabits, setDiaryHabits] = useState(() => {
        const saved = localStorage.getItem("diaryHabits");
        return saved ? JSON.parse(saved) : [];
    });

    const [selectedDiaryHabit, setselectedDiaryHabit] = useState(null);

    //Save data in localStorage
    useEffect(() => {
        localStorage.setItem("habits", JSON.stringify(habits));
        localStorage.setItem("diaryHabits", JSON.stringify(diaryHabits));
    }, [habits, diaryHabits]);



    return (
    <section id='habits-panel'>
        <div className='habit-controller'>
            <div className='habit-list'>
                <Habits
                    habits={habits}
                    setHabits={setHabits}
                    onSelectHabit={(h) => {
                        setSelectedHabit(h);
                        setselectedDiaryHabit(null); 
                    }}
                    editing={editing}
                    selectedHabit={selectedHabit}
                />
                <HabitDiary
                    diaryHabits={diaryHabits}
                    setDiaryHabits={setDiaryHabits}
                    onSelectHabit={(dh) => {
                        setselectedDiaryHabit(dh);
                        setSelectedHabit(null);
                    }}
                    editing={editing}
                    selectedHabit={selectedDiaryHabit} 
                />
            </div>
            
            <HabitDetail
                key={selectedDiaryHabit?.id || selectedHabit?.id || 'sin-seleccion'}
                habit={selectedHabit}
                diaryHabit={selectedDiaryHabit}
                setHabits={setHabits}
                setDiaryHabits={setDiaryHabits}
                setSelectedHabit={setSelectedHabit}
                setSelectedDiaryHabit={setselectedDiaryHabit}
                setEditing={setEditing}
                editing={editing} 
            />
        </div>
    </section>
);
}