import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash, faCheck, faCopy, faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Context } from '../context';

const MemoizedIcon = React.memo(FontAwesomeIcon);

export const AddTaskButton = React.memo(({ id }) => {
  const { addTask } = useContext(Context);
  return (
    <div className="add-task-btn list-row" onClick={() => addTask(id)}>
      <MemoizedIcon icon={faPlus} className="plus-icon" />
      <div className="add-text">Add a task</div>
    </div>
  );
});

export const DeleteTaskButton = React.memo(({ listID, taskID }) => {
  const { deleteTask } = useContext(Context);
  return (
    <div className="list-btn" onClick={() => deleteTask(listID, taskID)}>
      <MemoizedIcon icon={faTrash} className="btn-icon" />
    </div>
  );
});

export const CheckButton = React.memo(({ listID, taskID }) => {
  const { changeTaskStatus } = useContext(Context);
  return (
    <div className="list-btn" onClick={() => changeTaskStatus(listID, taskID)}>
      <MemoizedIcon icon={faCheck} className="btn-icon" />
    </div>
  );
});

export const AddListButton = React.memo(({ onAdd }) => (
  <div className="add-list panel" onClick={onAdd}>
    <MemoizedIcon icon={faPlus} className="plus-icon" />
    <div className="add-text">Add a new list</div>
  </div>
));

export const CopyListButton = React.memo(({ id }) => {
  const { copyList } = useContext(Context);
  return (
    <div className="list-btn" onClick={() => copyList(id)}>
      <MemoizedIcon icon={faCopy} className="btn-icon" />
    </div>
  );
});

export const DeleteListButton = React.memo(({ removeHandler }) => (
  <div className="list-btn" onClick={removeHandler}>
    <MemoizedIcon icon={faTrash} className="btn-icon" />
  </div>
));
