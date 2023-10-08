import styles from './Column.module.css';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task/Task';
import { TaskInterface, ColumnIntarface } from '../Kanban/Kanban';


interface ColumnProps {
    title: string;
    id: string;
    column: ColumnIntarface
}

function Column ({title, id, column}: ColumnProps) {

    return ( 
            <Droppable
                key={id}
                droppableId={id}
            >
                {(provided, snapshot) => (
                    <section className={styles.container}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            background: snapshot.isDraggingOver ? '#9AD1DD' : '#435A5F',
                        }}
                    >
                        <h2>{title}</h2>
                        {column.items.length > 0 && <p>Всего задач: {column.items.length}</p>}
                        {column.items && column.items.map((item: TaskInterface, index: number) => (
                                <Task key={item.id} index={index} task={item}/>
                            ))}
                        {provided.placeholder}
                    </section>
                )}
        </Droppable>
    );
}

export default Column;