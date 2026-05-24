import { useState, useEffect } from 'react';
import Habits from '../components/habitList/Habits'
import HabitDetail from '../components/habitDetail/HabitDetail'

import './HabitsRegisterPanelStyle.css'

export default function HabitRegisterPanel() {
    const [habits, setHabits] = useState(() => {
        const saved = localStorage.getItem("habits");
        return saved ? JSON.parse(saved) : [];
    });
    const [selectedHabit, setSelectedHabit] = useState(null);


    useEffect(() => {
        localStorage.setItem("habits", JSON.stringify(habits));
    }, [habits]);

    const [editing, setEditing] = useState(false);

    return (
        <section id='habits-panel'>
            <h2>List of habits</h2>
            <p>Your recorded habits</p>
            <div className='habit-controller'>
                <Habits
                    habits={habits}
                    setHabits={setHabits}
                    onSelectHabit={setSelectedHabit}
                    editing={editing}
                />
                <HabitDetail
                    habit={selectedHabit}
                    setHabits={setHabits}
                    setSelectedHabit={setSelectedHabit}
                    setEditing={setEditing}
                    editing={editing} />
            </div>
        </section>
    );
}