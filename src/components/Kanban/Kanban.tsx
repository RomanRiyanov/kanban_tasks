import { useState, useEffect } from 'react';
import styles from './Kanban.module.css';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectAllTasks, addTaskAfterMoved } from '../../store/reducers/tasks/tasksReducer';
import Column from '../Column/Column';
// import Popup from '../Popup/Popup';
  
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

// const DataBaseColumns: Columns = [
//     {
//         name: 'first',
//         title: 'План',
//         items: [
//             {
//                 text: 'Задача 1',
//                 id: 'qwerty234567'
//             }, 
//             {
//                 text: 'Задача123Задача123З адача123Задача123vv Задача123vЗадач а123Задача12 3Задача123',
//                 id: 'rtyuiop4567'
//             },         
//         ],
//     },
//     {
//         name: 'second',
//         title: 'В работе',
//         items: [],
//     },
//     {
//         name: 'third',
//         title: 'В тестировании',
//         items: [],
//     },
//     {
//         name: 'fourth',
//         title: 'Выполнено',
//         items: [],
//     },
// ];

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
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];

            const [removed] = sourceItems.splice(source.index, 1);
            const removedCopy = {...removed};
            removedCopy.col = destination.droppableId;

            const movingTask = {
                oldColumn: source.droppableId,
                newColumn: destination.droppableId,
                newTask: removedCopy
            }
            dispatch(addTaskAfterMoved(movingTask))
            
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

    // const handleChangeTasks = (task: string) => {
    //     if (columns) {
    //         setColumns([...columns].map(column => {
    //         if (column.name === 'first') {
    //             const oldItems = column.items;
    //             const newItem = {
    //                 id: task.slice(0, 10),
    //                 text: task
    //             }
    //           return {
    //             ...column,
    //             items: [...oldItems, newItem],
    //           }
    //         } 
    //             else return column;
    //         }))    
    //     }
    // }

    useEffect(() => {
        setColumns(allTasksFromReduxStore)
    }, [allTasksFromReduxStore])

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