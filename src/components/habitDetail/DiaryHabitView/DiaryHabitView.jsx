

// 1. CONSTANTE FUERA DEL COMPONENTE (Limpia el espacio de trabajo)
const INITIAL_DAYS = [
    { id: 1, nombre: 'L', completado: false },
    { id: 2, nombre: 'M', completado: false },
    { id: 3, nombre: 'M', completado: false },
    { id: 4, nombre: 'J', completado: false },
    { id: 5, nombre: 'V', completado: false },
    { id: 6, nombre: 'S', completado: false },
    { id: 7, nombre: 'D', completado: false },
];

export default function DiaryHabitView({ 
    editing, startEditing, editData, setEditData, saveNewDetail, 
    diaryHabit, setDiaryHabits, setSelectedDiaryHabit 
}) {

    const habitDays = diaryHabit.diasProgress || INITIAL_DAYS;

    // LÓGICA DE INTERACCIÓN
    function toggleDay(idDia) {
        const diasActualizados = habitDays.map(dp =>
            dp.id === idDia ? { ...dp, completado: !dp.completado } : dp
        );

        const habitoActualizado = {
            ...diaryHabit,
            diasProgress: diasActualizados
        };

        setDiaryHabits(prev => prev.map(hd =>
            hd.id === diaryHabit.id ? habitoActualizado : hd
        ));
        setSelectedDiaryHabit(habitoActualizado);
    }

    // 2. SUB-RENDERIZADOS (Evitan la ensalada de ternarios en el return principal)
    const renderTitleSection = () => {
        if (editing) {
            return <input type="text" value={editData.text || ""} onChange={(e) => setEditData(prev => ({ ...prev, text: e.target.value }))} />;
        }
        return <h2 className='habit-title'>{diaryHabit.text}</h2>;
    };

    const renderMetaSection = () => {
        if (editing) {
            return <input type="number" value={editData.meta || 0} onChange={(e) => setEditData(prev => ({ ...prev, meta: e.target.value }))} />;
        }
        return <p>Meta: {diaryHabit.meta}</p>;
    };

    // 3. RENDER PRINCIPAL (Limpio, plano y fácil de seguir)
    return (
        <div id="habit-detail-panel">
            {renderTitleSection()}
            
            <div>
                <h3>Datos Diario</h3>
                {!editing && <button onClick={startEditing}>Edit</button>}
                
                <p>Registrado: {new Date(diaryHabit.createdAt).toLocaleString()}</p>
                {renderMetaSection()}
                <p>Days: {diaryHabit.dias}</p>
                
                {editing && <button onClick={saveNewDetail}>Save</button>}

                {/* REJILLA DE DÍAS */}
                <div className='habit-grid'>
                    {habitDays.map(d => (
                        <div key={d.id}>
                            <div>{d.nombre}</div>
                            <div 
                                className={`habit-grid-day ${d.completado ? 'habit-completed' : ''}`} 
                                onClick={() => toggleDay(d.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}