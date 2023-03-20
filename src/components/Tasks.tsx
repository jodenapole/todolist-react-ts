import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';
import { Task, TaskInterface } from './Task'
import styles from './Tasks.module.css';

const taskArray: TaskInterface[] = [
	{
		id: 0,
		content: 'Dar banho no cachorro',
		completed: false
	},
	{
		id: 1,
		content: 'Dar banho no gato',
		completed: false
	},
]


export function Tasks() {
	const [tasks, setTask] = useState(taskArray);
	const [taskContent, setTaskContent] = useState('');
	const [taskCompleted, setTaskCompleted] = useState(0)

	function handleTaskContentChange(event: ChangeEvent<HTMLInputElement>) {
		event.target.setCustomValidity('');
		setTaskContent(event.target.value);
	}

	function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		let newId!: number;

		tasks.map( task => {
			newId = task.id + 1
		})

		setTask([...tasks, {id: newId ? newId : 0, content: taskContent, completed: false}]);
		setTaskContent('');
	}

	function handleInvalidTaskContent(event: InvalidEvent<HTMLInputElement>) {
		event.target.setCustomValidity('este campo é obrigatório!')		
		
		console.log(tasks)
	}

	function onCompleteTask(completedFlag: boolean, tasktoChange: TaskInterface) {
		const updateCompletedTasksArray = tasks.map( task => {
			if (task.id === tasktoChange.id) {
				task.completed = completedFlag
			} 
			return task
		})
		
		setTask(updateCompletedTasksArray);

		const completedTasks = tasks.filter(task => task.completed);
		const completedTaskCount = completedTasks.length;
		
		setTaskCompleted(completedTaskCount)
	}

	function onDeleteTask(taskToDelete: number) {
		const tasksWithoutDeletedOne = tasks.filter( task => {
            return task.id !== taskToDelete;
        });

		const newCompletedTasks = tasksWithoutDeletedOne.filter( task => task.completed);
		const newCompletedTaskCount = newCompletedTasks.length;

		setTaskCompleted(newCompletedTaskCount)
		setTask(tasksWithoutDeletedOne);
	}

  return (
    <div className={styles.tasks}>
      <form
			className={styles.taskCreation}
			onSubmit={handleCreateNewTask}
		>
			<input
				type="text"
				className={styles.taskName}
				value={taskContent}
				onChange={handleTaskContentChange}
				onInvalid={handleInvalidTaskContent}
				placeholder='Add a new task'
				required
			/>
			<button
				className={styles.addTask}
			>
				Create
				<PlusCircle size={20} />
			</button>
		</form>

        <header className={styles.tasksHeader}>
            <p className={styles.createdTasks}>Tarefas Criadas <span>{tasks.length}</span></p>
            <p className={styles.doneTasks}>Concluídas <span>{taskCompleted} de {tasks.length}</span></p>
        </header>
        

        <main className={styles.taskList}>
			{tasks.map( (task) => {
				return(
					<Task
						key={task.id}
						task={task}
						onDeleteTask={onDeleteTask}
						onCompleteTask={onCompleteTask}
					/>
				)
			})}
		</main>
    </div>
  );
}