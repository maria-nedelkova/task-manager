import React, { useRef, useEffect, useContext } from 'react'
import ContentEditable from 'react-contenteditable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Context } from './context'

export const Task = props => {

  const { id, listID, isDone, text } = props
  const contentClassName = isDone ? 'text-area-green' : 'text-area'
  const disabled = isDone ? true : false
  const contentEditable = useRef(null);
  const { deleteTask, changeTaskStatus, editTask } = useContext(Context)

  useEffect(() => {
    contentEditable.current.focus({ preventScroll: false });
  }, [])

  const handleChange = (listID, id, event) => {
    const text = event.target.value
    editTask(listID, id, text)
  }

  return (
    <div className="list-row">
      <ContentEditable
        innerRef={contentEditable}
        html={text}
        disabled={disabled}
        className={contentClassName}
        onChange={handleChange.bind(null, listID, id)}
      />
      <div className="list-btn"
        onClick={deleteTask.bind(null, listID, id)}>
        <FontAwesomeIcon icon={faTrash} className="btn-icon" />
      </div>
      <div className="list-btn"
        onClick={changeTaskStatus.bind(null, listID, id)}>
        <FontAwesomeIcon icon={faCheck} className="btn-icon" />
      </div>
    </div>
  );
}