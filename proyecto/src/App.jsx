import { useState, useEffect } from "react";

function App() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);

  // Cargar desde localStorage
  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits"));
    if (savedHabits) {
      setHabits(savedHabits);
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (habit.trim() === "") return;

    const newHabit = {
      id: Date.now(),
      name: habit,
      completed: false,
      streak: 0,
    };

    setHabits([...habits, newHabit]);
    setHabit("");
  };

  const toggleHabit = (id) => {
    const updatedHabits = habits.map((h) =>
      h.id === id
        ? {
            ...h,
            completed: !h.completed,
            streak: !h.completed ? h.streak + 1 : h.streak - 1,
          }
        : h
    );

    setHabits(updatedHabits);
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  const progress =
    habits.length === 0
      ? 0
      : Math.round(
          (habits.filter((h) => h.completed).length / habits.length) * 100
        );

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🌱 HabitFlow</h1>

      <input
        type="text"
        placeholder="Nuevo hábito..."
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
      />
      <button onClick={addHabit}>Agregar</button>

      <h3>Progreso del día: {progress}%</h3>

      <ul>
        {habits.map((h) => (
          <li key={h.id} style={{ marginBottom: "10px" }}>
            <span
              style={{
                textDecoration: h.completed ? "line-through" : "none",
                marginRight: "10px",
              }}
            >
              {h.name}
            </span>

            <button onClick={() => toggleHabit(h.id)}>
              {h.completed ? "Desmarcar" : "Completar"}
            </button>

            <button onClick={() => deleteHabit(h.id)}>Eliminar</button>

            <span style={{ marginLeft: "10px" }}>
              🔥 Racha: {h.streak}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
