import React, { useState } from 'react';
function Home() {
    // Input field value
    const [task, setTask] = useState(''); // declaring a single variable to manaage the single tast what ever the user will entering that will be stored inside task
    // Task categories
    //js objects created as key value pairs, here tasklist we declared as object and it accepts 3 empty arrays
    const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] }); // but new tasks are keep on added thats why we created list of tasks(array of task) for that we take an variable setTasklist

    //handle input change
    const handleInputChange = (e) => {
        setTask(e.target.value);
    };

    //Add task to "To-Do" section
    const addTask = () => {
        if (task.trim() !== '') {
            setTasks((prevTasks) => ({
                ...prevTasks,
                todo: [...prevTasks.todo, task],
            }));
            setTask(''); //clear input
        }
    };

    // Move task to another category
    const moveTask = (currentCategory, targetCategory, taskToMove) => {
        setTasks((prevTasks) => {
            //remove task from current category
            const updatedCurrent = prevTasks[currentCategory].filter(
                (t) => t !== taskToMove
            );
            // Add task to target category
            const updatedTarget = [...prevTasks[targetCategory], taskToMove];
            return { ...prevTasks, [currentCategory] : updatedCurrent, [targetCategory]: updatedTarget };
        });
    };


    return (
        <div className="home">
            <form 
                className="task-form" 
                onSubmit={(e) => {
                    e.preventDefault(); //prevent form reload
                    addTask();
                }}
            >
                <input 
                    type="text" 
                    placeholder="Enter task..." 
                    className="task-input "
                    value={task}
                    onChange={handleInputChange}
                />
                <button
                    type="button"
                    className="add-task-button"
                    onClick={addTask}
                >
                    ADD TASK
                </button>
            </form>

            <div className="task-sections">
                {/* To-Do Section */}
                <div className="task-section">
                    <h2>To-Do Tasks</h2> 
                    <ul>
                        {tasks.todo.map((t, index) => (
                            <li key={index}>
                                {t}
                                <select
                                    onChange={(e) => {
                                        const targetCategory = e.target.value;
                                        if(targetCategory) {
                                            moveTask('todo', targetCategory, t);
                                            e.target.value = '';
                                        }
                                    }}
                                >
                                    <option value = ""> </option>
                                    <option value = "ongoing">Ongoing</option>
                                    <option value = "completed">Completed</option>
                                </select>
                                {/* <button
                                    onClick={() => moveTask('todo', 'ongoing', t)}
                                >
                                    Move to Ongoing
                                </button>
                                <button 
                                    onClick = {() => moveTask('todo', 'completed', t)}
                                >
                                    Move to Completed
                                </button> */}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Ongoing Section */}
                <div className="task-section">
                    <h2>Ongoing Tasks</h2>
                    <ul>
                        {tasks.ongoing.map((t, index) => (
                            <li key = {index}>
                                {t}
                                <select
                                    onChange={(e) => {
                                        const targetCategory = e.target.value;
                                        if(targetCategory) {
                                            moveTask('ongoing', targetCategory, t);
                                            e.target.value = '';
                                        }
                                    }}
                                >
                                    <option value = ""> </option>
                                    <option value = "todo">To-do</option>
                                    <option value = "completed">Completed</option>
                                </select>
                                {/* <button
                                    onClick= { () => moveTask('ongoing', 'todo', t)}
                                >
                                    Move to To-Do
                                </button>
                                <button
                                    onClick={() => moveTask('ongoing', 'completed', t)}
                                >
                                    Move to Completed
                                </button> */}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Completed Section */}
                <div className="task-section">
                    <h2>Completed Tasks</h2>
                    <ul>
                        {tasks.completed.map((t, index) => (
                            <li key={index}>
                                {t}
                                <select
                                    onChange={(e) => {
                                        const targetCategory = e.target.value;
                                        if(targetCategory) {
                                            moveTask('completed', targetCategory, t);
                                            e.target.value = '';
                                        }
                                    }}
                                >
                                    <option value = ""> </option>
                                    <option value = "todo">To-do</option>
                                    <option value = "ongoing">Ongoing</option>
                                </select>
                                {/* <button
                                    onClick={() => moveTask('completed', 'todo', t)}
                                >
                                    Move to To-Do
                                </button>
                                <button 
                                    onClick={() => moveTask('completed', 'ongoing', t)}
                                >
                                    Move to Ongoing
                                </button> */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Home;



