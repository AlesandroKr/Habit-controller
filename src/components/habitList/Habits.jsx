import { useState } from "react";

import './HabitsStyle.css'
import { useElapsedTime } from '../../hooks/useElapsedTime';


export default function Habits({ habits, setHabits, onSelectHabit, editing, selectedHabit }) {

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
            <div className="habits-input">
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
                            isSelected={selectedHabit?.id === habit.id}
                        />) :
                    <span className="loading"> There aren't any habit yet ... add one</span>}
            </ul>
        </div>
    );
}

function HabitItem({ habit, onDelete, onSelect, editing, isSelected }) {
    const { años, meses, dias, horas, minutos, segundos } = useElapsedTime(habit.startDate);

    const pad = (n) => String(n).padStart(2, '0');


    return (
        <li className={isSelected ? "selected" : ""} onClick={!editing ? onSelect : undefined}>
            <span>{habit.text}</span>
            <span className='habit-timer'>
                {años > 0 && <>{pad(años)}a : </>}
                {meses > 0 && <>{pad(meses)}m : </>}
                {dias > 0 && <>{pad(dias)}d : </>}
                {horas > 0 && <>{pad(horas)}h : </>}
                {pad(minutos)}m  {dias>=0 &&<>: {pad(segundos)}s</> }
            </span>
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                <i className="ri-delete-bin-line"></i>
            </button>
        </li>
    );
}