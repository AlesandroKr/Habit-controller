import { useState } from "react";

import './HabitsStyle.css'
import { useElapsedTime } from '../../hooks/useElapsedTime';


export default function Habits({ habits, setHabits, onSelectHabit, editing }) {

    const [newHabit, setNewHabit] = useState("");
    const [newDate, setNewDate] = useState("");


    const addHabit = () => {
        if (!newHabit || !newDate) return;
        setHabits([...habits,
        {
            id: Date.now(),
            text: newHabit,
            createdAt: new Date().toISOString(),
            dueDate: null,
            startDate: newDate,
            meta: 0,
        }
        ]);
        setNewHabit("");
        setNewDate("");
    };

    const deleteHabit = (index) => {
        setHabits(habits.filter((_, i) => i !== index));
    }

    return (
        <div id="habits">

            <div>
                <input
                    type="text"
                    value={newHabit}
                    onChange={(h) => setNewHabit(h.target.value)}
                    placeholder="Write a new habit"
                />
                <input
                    id="date-habit"
                    type="datetime-local"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                />
                <button onClick={addHabit}>Add</button>
            </div>

            <ul>
                {habits && habits.length > 0 ?
                    habits.map((habit, index) =>
                        <HabitItem
                            key={index}
                            habit={habit}
                            onDelete={() => deleteHabit(index)}
                            onSelect={() => onSelectHabit(habit)}
                            editing={editing}
                        />) :
                    <span className="loading"> There aren't any habit yet ... add one</span>}
            </ul>
        </div>
    );
}

function HabitItem({ habit, onDelete, onSelect, editing }) {
    const { dias, horas, minutos, segundos } = useElapsedTime(habit.startDate);

    return (
        <li onClick={!editing ? onSelect : undefined}>
            <span>{habit.text}</span>
            <span>{dias}d {horas}h {minutos}m {segundos}s</span>
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                <i className="ri-delete-bin-line"></i>
            </button>
        </li>
    );
}