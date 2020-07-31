import React, { useRef, useLayoutEffect, useContext } from 'react'
import { Task } from './Task'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCopy, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Context } from '../context'

export const Panel = props => {

  const { id, name, highlight, tasks } = props
  const animation = highlight ? { animationName: 'highlight' } : {}
  const divPanel = useRef(null);
  const { addTask, deleteList, copyList, editListName} = useContext(Context)

  useLayoutEffect(() => {
    const rect = divPanel.current.getBoundingClientRect()
    props.pushPanelHeight(id, rect.height)
  }, [tasks])

  const renderTasks = () => {
    if (tasks.length > 0) {
      const arrayOfTasks = tasks.map(task => {
        return (
          <Task key={task.id}
            id={task.id}
            listID={id}
            isDone={task.isDone}
            text={task.text}
          />
        );
      });
      return arrayOfTasks
    } else {
      return false
    }
  }

  const handleChange = (id, event) => {
    const name = event.target.value
    editListName(id, name)
  }

  const removeHandler = id => {
    deleteList(id)
    props.deletePanelHeight(id)
  }

  return (
    <div className='panel' ref={divPanel} style={animation}>
      <div className="list-header list-row">
        <input type="text"
               placeholder="Enter list name..." 
               className="list-name"
               value={name}
               onChange={handleChange.bind(null, id)}
        />
        <div className="list-btn"
          onClick={removeHandler.bind(null, id)}>
          <FontAwesomeIcon icon={faTrash} className="btn-icon" />
        </div>
        <div className="list-btn"
             onClick={copyList.bind(null,id)}>
          <FontAwesomeIcon icon={faCopy} className="btn-icon" />
        </div>
      </div>
      {renderTasks()}
      <div className="add-task-btn list-row"
        onClick={addTask.bind(null,id)}>
        <FontAwesomeIcon icon={faPlus} className="plus-icon" />
        <div className="add-text">Add a task</div>
      </div>
    </div>
  );
}

