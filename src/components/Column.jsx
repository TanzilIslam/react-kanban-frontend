import { Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import Task from "./Task";

const Column = ({ column, tasks, columnIndex, onReload }) => {
  const taskLength = tasks.filter((task) => task.column === column.id).length;
  return (
    <Draggable key={column.id} draggableId={column.id} index={columnIndex}>
      {(columnProvided) => (
        <div
          ref={columnProvided.innerRef}
          {...columnProvided.draggableProps}
          className="flex-shrink-0 w-[345px] p-4 bg-gray-200 rounded overflow-auto column-height"
        >
          <div className="flex justify-between mb-4 rounded bg-gray-200  items-center">
            <div className="flex items-center gap-2">
              <div className={`${column?.color} h-4 w-4  rounded-full`}></div>
              <h2 {...columnProvided.dragHandleProps}>{column.name}</h2>
            </div>
            <p className="border bg-gray-100 shadow py-1 px-2 rounded text-sm">
              {taskLength}
            </p>
          </div>

          <Droppable droppableId={column.id} type="TASK">
            {(taskProvided) => (
              <div
                {...taskProvided.droppableProps}
                ref={taskProvided.innerRef}
                className="tasks-container"
              >
                {tasks
                  .filter((task) => task.column === column.id)
                  .map((task, taskIndex) => (
                    <Task
                      key={task.id}
                      task={task}
                      taskIndex={taskIndex}
                      onReload={onReload}
                    />
                  ))}
                {taskProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

Column.propTypes = {
  column: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  columnIndex: PropTypes.number.isRequired,
  onReload: PropTypes.func.isRequired,
};

export default Column;
