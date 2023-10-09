import styles from './Task.module.css';
import delete_button from '../../assets/delete_button.svg';
import edit_button from '../../assets/edit_button.svg';
import { Draggable } from 'react-beautiful-dnd';
import { TaskInterface } from '../Kanban/Kanban';
import { useAppDispatch } from '../../store/hooks';
import { setPopupOpen, setEditText, setDeletePopupOpen, setTaskToDeletePopup } from '../../store/reducers/popup/popupReducer';

interface TaskProps {
    task: TaskInterface;
    index: number
}

function Task ({task, index}: TaskProps) {
    const dispatch = useAppDispatch();

    const handleDeleteTask = () => {
        dispatch(setPopupOpen());
        dispatch(setDeletePopupOpen());
        dispatch(setTaskToDeletePopup(task));
    }

    const handleEditTask = () => {
        dispatch(setEditText(task.text));
        dispatch(setTaskToDeletePopup(task));
        dispatch(setPopupOpen());
    }

    return ( 
        <Draggable
            key={task.id}
            draggableId={task.id}
            index={index}
            disableInteractiveElementBlocking={true}
        >
        {(provided) => (
            <section 
                className={styles.container} 
                id={task.id}
                ref={provided.innerRef} 
                {...provided.dragHandleProps}
                {...provided.draggableProps}
            >
                <div className={styles.buttons}>
                    <button onClick={handleEditTask} type='button' className={styles.button}>
                        <img className={styles.image} src={edit_button} alt="Edit task" />
                    </button>
                    <button onClick={handleDeleteTask} type='button' className={styles.button}>
                        <img className={styles.image} src={delete_button} alt="Delete task" />
                    </button>
                </div>
                <p className={styles.text}>{task.text}</p>
            </section>
        )}
        </Draggable>
    );
}

export default Task;