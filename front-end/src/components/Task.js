import React, { useRef, useEffect, useContext } from 'react'
import ContentEditable from 'react-contenteditable'
import { Context } from '../context'
import { DeleteTaskButton, CheckButton } from './Buttons'

export const Task = React.memo(props => {

  const { id, listID, isDone, text } = props
  const contentClassName = text ? (isDone ? 'text-area-crossed' : 'text-area'):'text-area-empty'
  const disabled = isDone ? true : false
  const contentEditable = useRef(null);
  const { editTask } = useContext(Context)

  useEffect(() => {
    contentEditable.current.focus();
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
        onChange={(event) => handleChange(listID, id, event)}
      />
      <DeleteTaskButton listID={listID} taskID={id} />
      <CheckButton listID={listID} taskID={id} />
    </div>
  );
})