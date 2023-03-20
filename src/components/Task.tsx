import { Trash, Circle, Check, CheckCircle } from 'phosphor-react';
import { useState } from 'react';
import styles from './Task.module.css';

export interface TaskInterface {
    id: number,
    content: string,
    completed: boolean
}

interface TaskProps {
    task: TaskInterface,
    onDeleteTask: (task: number) => void,
    onCompleteTask: (completedFlag: boolean, task: TaskInterface) => void,
}

export function Task({ task, onCompleteTask, onDeleteTask }: TaskProps) {
    const [isMouseHover, setIsMouseHover] = useState(false);
    const [isTaskDone, setTaskDone] = useState(false);
    

    function handleDeleteTask() {
        onDeleteTask(task.id)
    
    }

    function toggleTaskDone() {
		setTaskDone( isTaskDoneCurrently => {
			return !isTaskDoneCurrently
		})
        onCompleteTask(!isTaskDone, task)
	}

    function mouseEnter() {
        setIsMouseHover(true)
    }

    function mouseLeave() {
        setIsMouseHover(false)
    }
    return (
        <div className={styles.task}>
            <button 
                className={styles.buttonCheck}
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                onClick={toggleTaskDone}
                
            >
                {isTaskDone ?
                    (
                        <CheckCircle
                            size={20}
                            color="#5E60CE"
                            weight="fill"
                        />
                    ) : (
                        <Circle
                            size={20}
                            color="#4EA8DE"
                            weight={isMouseHover ? "duotone" : "regular"}
                        />
                    )}
            </button>
            <p
                className={
                    isTaskDone ? 
                        (
                            styles.taskContentActive + ' ' + styles.taskContent
                        ) : 
                            styles.taskContent 
                    }
            >
                {task.content}
            </p>
            <button
                className={styles.deleteTask}
                onClick={handleDeleteTask}
            >
                <Trash size={20} />
            </button>
        </div>
    );
}