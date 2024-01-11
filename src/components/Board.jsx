import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import Column from "./Column";

const Board = ({ columns, tasks, onDragEnd, onReload }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex space-x-4 p-4 overflow-x-auto"
          >
            {columns.map((column, columnIndex) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                columnIndex={columnIndex}
                onReload={onReload}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

Board.propTypes = {
  columns: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
};

export default Board;
