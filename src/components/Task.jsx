import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import {
  FaClipboardList,
  FaRocketchat,
  FaLink,
  FaRegCalendarDays,
} from "react-icons/fa6";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import FileUpload from "./FileUpload";
import FileList from "./FileList";
import instance from "../plugins/axios";
import { toast } from "react-toastify";

const Task = ({ task, taskIndex, onReload }) => {
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);

  const showFileModal = () => {
    setShowModal(true);
  };

  const handleFilesSelected = async (filesData) => {
    try {
      const formData = new FormData();
      for (const file of filesData) {
        formData.append("files", file);
      }

      // Make a POST request to the server
      await instance
        .post(`tasks/${task?.id}/upload`, formData)
        .then(async (res) => {
          await onReload();
          toast("Files uploaded successfully");
        });
    } catch (error) {
      console.error("Error uploading files:", error);
      // Handle error or show a notification to the user
    }
  };

  const deleteFile = (file, index) => {
    if (file?.id) {
      instance
        .delete(`tasks/${file?.id}/file/${file?._id}/${file?.name}`)
        .then(async (res) => {
          await onReload();
          toast("File deleted successfully");
        });
    }
  };

  useEffect(() => {
    setFiles(task?.files);
  }, [task?.files?.length]);

  return (
    <>
      <Draggable key={task?.id} draggableId={task?.id} index={taskIndex}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="p-2 mb-2 bg-white shadow-md rounded"
          >
            <div className="flex justify-between">
              <div className="flex gap-1 items-center mb-4">
                <img
                  src={task?.client_photo}
                  alt={task?.client_name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <p className="text-xs text-gray-600 font-bold">
                  {task?.client_name}
                </p>
              </div>
              <div className="flex gap-1  items-center mb-4">
                <img
                  src={task?.assignee_photo}
                  alt={task?.assignee_name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <p className="text-xs text-gray-600 font-medium">
                  {task?.assignee_name}
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-between mb-4">
              <p className="text-xs text-slate-500">
                {task?.content?.substring(0, 40)}...
              </p>
              <div className="flex items-center gap-1 bg-slate-100 text-xs px-1 rounded text-gray-500">
                <FaClipboardList className="text-gray-500" />
                <p className="font-bold">1/2</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <img
                src={task?.client_photo}
                alt={task?.client_name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <img
                src={task?.assignee_photo}
                alt={task?.assignee_name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <div className="text-xs font-bold text-gray-500 bg-slate-100 rounded-full p-1">
                12+
              </div>
              <div className="flex items-center gap-1">
                <FaRocketchat className="text-gray-500" />
                <p className="text-xs text-gray-500 font-bold">15</p>
              </div>
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => showFileModal()}
              >
                <FaLink className="text-gray-500" />
                <p className="text-xs text-gray-500 font-bold">
                  {task?.files?.length}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <FaRegCalendarDays className="text-gray-500" />
                <p className="text-xs text-gray-500 font-bold">
                  {task?.created_at}
                </p>
              </div>
            </div>
          </div>
        )}
      </Draggable>
      <Modal
        showModal={showModal}
        handleCloseModal={() => {
          setShowModal(false);
        }}
      >
        <p className="text-sm text-gray-600 font-bold">{task?.content}</p>

        <FileList files={files} task={task} onDeleteFile={deleteFile} />
        <FileUpload files={files} onFilesSelected={handleFilesSelected} />
      </Modal>
    </>
  );
};

export default Task;
