import { useEffect, useState } from "react";
import Board from "./components/Board";
import { DragDropContext } from "react-beautiful-dnd";
import BoardLoader from "./components/BoardLoader";
import instance from "./plugins/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return; // Item dropped outside a valid droppable area
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return; // Item dropped at the same position
    }

    if (type === "COLUMN") {
      // Handling column drag
      const newColumns = [...columns];
      const draggedColumn = newColumns.find(
        (column) => column.id === draggableId
      );

      newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, draggedColumn);

      setColumns(newColumns);
    } else if (type === "TASK") {
      const task_id = draggableId;
      const columns_id = destination.droppableId;

      instance.put(`tasks/${task_id}/column/${columns_id}`).then((res) => {
        toast("Task moved successfully");
      });

      // Handling task drag
      const newTasks = JSON.parse(JSON.stringify(tasks));
      const draggedTask = newTasks.find((task) => task.id === draggableId);

      const sourceTasks = newTasks.filter(
        (task) => task.column === source.droppableId
      );
      sourceTasks.splice(source.index, 1);

      const destinationTasks = newTasks.filter(
        (task) => task.column === destination.droppableId
      );
      destinationTasks.splice(destination.index, 0, draggedTask);

      draggedTask.column = destination.droppableId;

      setTasks(newTasks);
    }
  };

  const onPageLoad = async () => {
    await instance.get("columns").then((res) => {
      setColumns(res?.data);
    });
    await instance.get("tasks").then((res) => {
      setTasks(res?.data);
    });
    setLoading(false);
  };

  useEffect(() => {
    onPageLoad();
  }, []);

  return (
    <>
      {loading ? (
        <BoardLoader />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Board
            columns={columns}
            tasks={tasks}
            onDragEnd={onDragEnd}
            onReload={onPageLoad}
          />
        </DragDropContext>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
    </>
  );
};

export default App;
