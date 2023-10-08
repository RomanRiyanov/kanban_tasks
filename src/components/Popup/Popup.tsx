import styles from './Popup.module.css';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useRef } from 'react';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPopupClose, selectOpen, selectEditText, setEditText } from '../../store/reducers/popup/popupReducer';
import { addTask, selectAllTasks } from '../../store/reducers/tasks/tasksReducer';
import { TaskInterface } from '../Kanban/Kanban';

const cx = classNames.bind(styles);
  
function Popup() {

    
    const [columnValue, setColumnValue] = useState('first');
    
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectOpen);
    const allTasks = useAppSelector(selectAllTasks);
    const editText = useAppSelector(selectEditText);
    const [inputValue, setInputValue] = useState(editText);
    const popupWindowClassName = cx({
        popup: true,
        viewable: isOpen === true,
      })

    const ref = useRef(null);

    const handleCloseButton = () => {
        dispatch(setPopupClose());
    }

    // const handleAddTask = () => {
    //     handleChangeTasks(inputValue);
    //     setInputValue('');
    //     dispatch(setPopupClose());
    // }

    const handleAddTask = () => {
        // handleChangeTasks(inputValue);

        const newTask: TaskInterface = {
            text: inputValue,
            id: uuidv4(),
            col: columnValue
        }
        dispatch(addTask(newTask));
        setInputValue('');
        dispatch(setEditText(''))
        dispatch(setPopupClose());
    }
  
    useEscapeKey(handleCloseButton);
    useOutsideClick(handleCloseButton, ref);

    useEffect(() => {
        console.log('allTasks', allTasks)
    }, [allTasks])

    return ( 
        <article className={popupWindowClassName}>
            <div ref={ref} className={styles.window}>
                <button type="button" onClick={handleCloseButton} className={styles.close}></button>
                
                <input value={inputValue} type="text" onChange={(e) => setInputValue(e.target.value)} />
                
                

                <select
                    value={columnValue}
                    onChange={e => setColumnValue(e.target.value)}
                    defaultValue="first"
                >
                    <option value="first">План</option>
                    <option value="second">В работе</option>
                    <option value="third">В тестировании</option>
                    <option value="fourth">Выполнено</option>
                </select>

                <button type="button" onClick={handleAddTask} className={styles.add}>
                    {editText !== '' ? 'Редактировать задачу' : 'Добавить задачу'}
                </button>
            </div>
        </article>
     );
}

export default Popup;