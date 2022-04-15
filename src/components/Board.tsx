import Card from 'components/Card';
import { Droppable } from 'react-beautiful-dnd';
import { IToDo } from 'atoms';

interface IBoardProps {
  boardId: string;
  toDos: IToDo[];
}

const Board = ({ boardId, toDos }: IBoardProps) => {
  return (
    <Droppable droppableId={boardId}>
      {(provided, { isDraggingOver, draggingFromThisWith }) => {
        return (
          <div
            className={`dnd-board ${
              isDraggingOver
                ? 'drag_over'
                : draggingFromThisWith
                ? 'drag_leave'
                : ''
            }`}
          >
            <h2>{boardId.toUpperCase()}</h2>
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {toDos.map((toDo, index) => (
                <Card {...toDo} key={toDo.id} index={index} />
              ))}
              {provided.placeholder}
            </ul>
          </div>
        );
      }}
    </Droppable>
  );
};

export default Board;
