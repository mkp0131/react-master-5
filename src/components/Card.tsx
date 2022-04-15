import { IToDo } from 'atoms';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface ICardProps extends IToDo {
  index: number;
}

const Card = ({ toDo, id, index }: ICardProps) => {
  return (
    <Draggable draggableId={id + ''} index={index}>
      {(provided, { isDragging }) => {
        return (
          <li
            className={`dnd-board__item ${isDragging ? 'drag' : ''}`}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            {toDo}
          </li>
        );
      }}
    </Draggable>
  );
};

export default React.memo(Card);
