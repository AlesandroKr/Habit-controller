import { useElapsedTime } from '../../../hooks/useElapsedTime';


export default function GeneralHabitView({ editing, startEditing, editData, setEditData, habit, activeHabit, saveNewDetail }) {

    const { años, meses, dias, horas, minutos, segundos } = useElapsedTime(activeHabit?.startDate);

    const pad = (n) => String(n).padStart(2, '0');


    return (
        <div id="habit-detail-panel">
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