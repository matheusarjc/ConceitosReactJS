import { Header } from './Components/Header';
import './global.css';
import { Tasks } from './Components/Tasks';
import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'todo:savedTasks'

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App(){
  const [tasks, setTasks] = useState<ITask[]>([]);

  function loadSaveTasks(){
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }

  useEffect(() => {
    loadSaveTasks()
  }, [])

  function setTasksAndSave(newTasks: ITask[]){
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function addTask(taskTitle: string){
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false
      }
    ]);
  }

  function deleteTaskClicked(taskId: string){
    const newTasks = tasks.filter(task => task.id != taskId)
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompleted(taskId: string) {
    const newTasks = tasks.map(task => {
      if(task.id == taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        }
      }
      return task;
    })
    setTasksAndSave(newTasks);
  }

  return(
    
    <div >
      <Header onAddTask={addTask} />
      
      <Tasks
        tasks = {tasks}
        onDelete={deleteTaskClicked}
        onComplete={toggleTaskCompleted}
      />
    </div>
  )
}