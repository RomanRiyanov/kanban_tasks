import { useState, useEffect } from 'react';
import styles from './Kanban.module.css';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectAllTasks, addTaskAfterMoved } from '../../store/reducers/tasks/tasksReducer';
import { initialState } from '../../store/reducers/tasks/tasksReducer';
import Column from '../Column/Column';

//фейковый вызов Api
import { sendApiData, getApiData } from '../../api/Api';

  
export interface TaskInterface {
    text: string;
    id: string;
    col: string
}

export interface ColumnIntarface {
    name: string;
    title: string;
    items: TaskInterface[] | [];
}

export type Columns = ColumnIntarface[];

function Kanban () {
    const [columns, setColumns] = useState<Columns>();
    const dispatch = useAppDispatch();
    const allTasksFromReduxStore = useAppSelector(selectAllTasks);
    
    const onDragEnd = (result: DropResult) => {

    if (!result.destination) return;
    const { source, destination } = result;

     //применяется при перетаскивании в новую колонку
    if (source.droppableId !== destination.droppableId) {       
        const sourceColumn = columns?.filter((column) => column.name === source.droppableId)[0];
        const destColumn = columns?.filter((column) => column.name === destination.droppableId)[0];

         if (sourceColumn && destColumn) {
            //узнаем текущие элементы в колонках отправения и назначения
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];

            //узнаем элемент, который мы подвинули и удаляем его в колонке отправления
            const [removed] = sourceItems.splice(source.index, 1);
            
            // меняем у подвинутого элемента значение колонки col
            const removedCopy = {...removed};
            removedCopy.col = destination.droppableId;
            
            //добавляем новый элемент в колонку отправления
            destItems.splice(destination.index, 0, removedCopy);

            setColumns([...columns].map(column => {
                if (column.name === source.droppableId) {
                return {
                    ...column,
                    items: sourceItems,
                }
                } else if (column.name === destination.droppableId) {
                    return {
                    ...column,
                    items: destItems,
                    }
                }
                else return column;
            }))
        }
    } 
    // применяется, если задача соатется в той же колонке и в случае изменения порядка
    else {
        const column = columns?.filter((column) => column.name === source.droppableId)[0];

        if (column) {
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        
        setColumns([...columns].map(column => {
            if (column.name === source.droppableId) {
              return {
                ...column,
                items: copiedItems,
              }
            } 
            else return column;
          }))
        }
    }
    };

    useEffect(() => {
        setColumns(allTasksFromReduxStore)
    }, [allTasksFromReduxStore])

    useEffect(() => {
        if (columns) {
            dispatch(addTaskAfterMoved(columns));
            sendApiData(columns);
        }
    }, [columns])

    useEffect(() => {
        const apiColumns = getApiData();

        if (apiColumns) {
            setColumns(apiColumns)
        } else sendApiData(initialState.columns)
    }, [])

    return ( 
        <main className={styles.container}>
            <DragDropContext
                onDragEnd={(result) => onDragEnd(result)}
            >
                {columns && columns.map((column) => (
                    <Column key={column.name} id={column.name} title={column.title} column={column} />
                ))}
            </DragDropContext>
            
        </main>
    );
}

export default Kanban;