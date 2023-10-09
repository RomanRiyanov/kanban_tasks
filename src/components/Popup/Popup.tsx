import styles from './Popup.module.css';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useRef } from 'react';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
    setPopupClose,
    selectOpen, 
    selectEditText, 
    setEditText, 
    setDeletePopupClose, 
    selectDeletePopupIsOpen,
    setTaskToDeletePopup,
    selectTaskToDeletePopup
 } 
from '../../store/reducers/popup/popupReducer';
import { addTask, deleteTask } from '../../store/reducers/tasks/tasksReducer';
import { TaskInterface } from '../Kanban/Kanban';

const cx = classNames.bind(styles);
  
function Popup() {
    const [columnValue, setColumnValue] = useState('first');
    
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectOpen);
    const isDeletePopupOpen = useAppSelector(selectDeletePopupIsOpen);
    const taskToDelete = useAppSelector(selectTaskToDeletePopup);
    const editText = useAppSelector(selectEditText);
    const [inputValue, setInputValue] = useState(editText);
    
    const popupWindowClassName = cx({
        popup: true,
        viewable: isOpen === true,
      })

    const ref = useRef(null);

    const handleCloseButton = () => {
        dispatch(setPopupClose());
        dispatch(setEditText(''));
        dispatch(setDeletePopupClose());
        setInputValue('')
    }

    const handleDeleteTask = () => {
        taskToDelete && dispatch(deleteTask(taskToDelete));
        dispatch(setTaskToDeletePopup(null));
        handleCloseButton();
    }


    const handleTask = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (inputValue.length > 2 && inputValue.length < 300) {
                const newTask: TaskInterface = {
                text: inputValue,
                id: uuidv4(),
                col: columnValue
            }
            if (editText)    {
                taskToDelete && dispatch(deleteTask(taskToDelete));
                dispatch(addTask(newTask));
            } else {
                dispatch(addTask(newTask));
            }
                setInputValue('');
                dispatch(setEditText(''))
                dispatch(setPopupClose());
        } else alert('Длина введенного текста должна быть больше 2 и меньше 300 символов')
    }
  
    useEscapeKey(handleCloseButton);
    useOutsideClick(handleCloseButton, ref);

    useEffect(() => {
        setInputValue(editText);
    }, [editText]);

    return ( 
        <article className={popupWindowClassName}>
            
            {!isDeletePopupOpen 
            ? <form ref={ref} className={styles.window}>
                <button type="button" onClick={handleCloseButton} className={styles.closeButton}></button>

                <h2>{editText !== '' ? 'Редактировать задачу' : 'Добавить задачу'}</h2>
                <textarea 
                    name='textarea'
                    placeholder='Введите текст'
                    minLength={2}  
                    maxLength={300}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} 
                    className={styles.textarea}
                >
                    {editText}
                </textarea>

                <h3 className={styles.subtitle}>Выбрать статус задачи</h3>
                <select
                    value={columnValue}
                    onChange={e => setColumnValue(e.target.value)}
                    className={styles.select}
                >
                    <option value="first">План</option>
                    <option value="second">В работе</option>
                    <option value="third">В тестировании</option>
                    <option value="fourth">Выполнено</option>
                </select>

                <button type="submit" onClick={handleTask} className={styles.addButton}>
    
                    {editText !== '' ? 'Редактировать' : 'Добавить'}
                </button>
            </form>
            : <form ref={ref} className={styles.window}>
                <button type="button" onClick={handleCloseButton} className={styles.closeButton}></button>

                <h2>Подтверждение</h2>
                <h2>Вы действительно хотите удалить эту задачу?</h2>

                 <div className={styles.buttonContainer}>
                    <button type="submit" onClick={handleCloseButton} className={styles.addButton}>Отменить</button>
                    <button type="submit" onClick={handleDeleteTask} className={styles.addButton}>Удалить</button>
                </div>
            </form>
            }
            
        </article>
     );
}

export default Popup;