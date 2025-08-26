import { nanoid } from 'nanoid';
import { useState } from 'react';
import '../index.css';

const initialState = [
    { id: nanoid(), name: 'Work', done: false },
    { id: nanoid(), name: 'Study', done: false },
    { id: nanoid(), name: 'Shop', done: false },
];

type initialStateProps = {
    id: string,
    name: string,
    done: boolean,
}

function Tasks() {
    const [taskList, setTaskList] = useState<initialStateProps[]>(initialState);
    const [newTask, setNewTask] = useState('')

    let items = taskList.map((task) => {
        return (
            <div key={task.id} className="task-item">
                <input
                    type="text"
                    value={task.name}
                    className="task-input"
                    onChange={(e) => handleChange(task.id, e.target.value)}
                />
                <button
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                >
                    Delete ✕
                </button>
            </div>
        )
    })

    function handleChange(id: string, newName: string) {
        setTaskList(tasks => tasks.map(task => task.id === id ? { ...task, name: newName } : task))
    }

    function deleteTask(id: string) {
        setTaskList(tasks => tasks.filter(task => task.id !== id));
    }

    function addTask() {
        if (!newTask.trim()) return;
        setTaskList(prev => [...prev, {
            id: nanoid(),
            name: newTask,
            done: false,
        }]);
        setNewTask('');
    }

    return (
        <div className="todo-container">
            <h1 className="todo-header">{items.length > 0 ? 'Может хватит?' : 'Накидай-ка себе задач, лентяй...'}</h1>

            <div className="add-task-container">
                <input
                    type="text"
                    placeholder='Add new task...'
                    value={newTask}
                    className="add-task-input"
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <button className="add-task-button" onClick={addTask}>
                    Add
                </button>
            </div>

            <div className="tasks-list">
                {items.length > 0 ? items : (
                    <div className="empty-state">Ты всё сделал, дурачок... 🎉</div>
                )}
            </div>
        </div>
    )
}

export default Tasks;