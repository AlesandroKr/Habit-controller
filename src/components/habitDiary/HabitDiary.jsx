import { useState } from "react";
import './HabitDiaryStyle.css'


export default function HabitDiary({ diaryHabits, setDiaryHabits, onSelectHabit, editing, selectedHabit }) {

    const [newHabit, setNewHabit] = useState("");

    const addHabit = () => {
        if (!newHabit) return;
        setDiaryHabits([...diaryHabits,
        {
            id: Date.now(),
            text: newHabit,
            createdAt: new Date().toISOString(),
            dueDate: null,
            meta: 0,
            days: 0,
        }
        ]);
        setNewHabit("");
    };

    const deleteHabit = (index) => {
        setDiaryHabits(diaryHabits.filter((_, i) => i !== index));
    }

    return (
        <div id="habits">
            <div className='panel-description'>
                <h2>Diary Habits</h2>
                <p>Register how is going on your habits everyday</p>
            </div>
            <div className="habits-input">
                <input
                    type="text"
                    value={newHabit}
                    onChange={(h) => setNewHabit(h.target.value)}
                    placeholder="Write a new habit"
                />

                <button onClick={addHabit}>Add</button>
            </div>

            <ul>
                {diaryHabits && diaryHabits.length > 0 ?
                    diaryHabits.map((diaryHabits, index) =>
                        <HabitItem
                            key={index}
                            diaryHabits={diaryHabits}
                            onDelete={() => deleteHabit(index)}
                            onSelect={() => onSelectHabit(diaryHabits)}
                            editing={editing}
                            isSelected={selectedHabit?.id === diaryHabits.id}
                        />) :
                    <span className="loading"> There aren't any habit yet ... add one</span>}
            </ul>
        </div>
    );
}

function HabitItem({ diaryHabits, onDelete, onSelect, editing, isSelected }) {

    return (
        <li className={isSelected ? "selected" : ""} onClick={!editing ? onSelect : undefined}>
            <span>{diaryHabits.text}</span>
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                <i className="ri-delete-bin-line"></i>
            </button>
        </li>
    );
}