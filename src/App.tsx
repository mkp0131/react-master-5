import Board from 'components/Board';
import Form from 'components/Form';
import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { IToDoState, toDoState } from './atoms';

function App() {
  const [toDos, setToDos] = useRecoilState<IToDoState>(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;

    setToDos((allBoard) => {
      const srcBoard = source.droppableId;
      const srcIndex = source.index;
      const destBoard = destination.droppableId;
      const destIndex = destination.index;

      if (srcBoard === destBoard) {
        const copyToDos = [...allBoard[srcBoard]];

        const spliceTodo = copyToDos.splice(srcIndex, 1);
        copyToDos.splice(destIndex, 0, ...spliceTodo);

        return {
          ...allBoard,
          [srcBoard]: copyToDos,
        };
      } else {
        const copySrcBoard = [...allBoard[srcBoard]];
        const copyDestBoard = [...allBoard[destBoard]];

        const spliceTodo = copySrcBoard.splice(srcIndex, 1);
        copyDestBoard.splice(destIndex, 0, ...spliceTodo);

        return {
          ...allBoard,
          [srcBoard]: copySrcBoard,
          [destBoard]: copyDestBoard,
        };
      }
    });
  };

  console.log(1);

  return (
    <>
      <div className="container">
        <div className="inner">
          <h1>React beautiful dnd</h1>
          <Form />
          <div className="dnd-artboard">
            <DragDropContext onDragEnd={onDragEnd}>
              {Object.keys(toDos).map((toDoId) => {
                return (
                  <Board key={toDoId} boardId={toDoId} toDos={toDos[toDoId]} />
                );
              })}
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
