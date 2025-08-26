import { useState } from "react";
import { nanoid } from 'nanoid'

const initialState = [
    { id: nanoid(), name: 'Work' },
    { id: nanoid(), name: 'Study' },
    { id: nanoid(), name: 'Shop' },
];

function Tasks() {
    const [taskList, setTaskList] = useState(initialState);

    // Функция для изменения задачи
    const handleTaskChange = (id: string, newName: string) => {
        setTaskList(prevTasks => 
            prevTasks.map(task => 
                task.id === id ? { ...task, name: newName } : task
            )
        );
    };

    let items = taskList.map((task) => {
        return (
            <input 
                key={task.id} 
                type="text" 
                value={task.name}
                onChange={(e) => handleTaskChange(task.id, e.target.value)}
            />
        );
    });

    return (
        <>
            <h1>Tasks:</h1>
            {items}
        </>
    );
}

export default Tasks;