import React, { useRef, useLayoutEffect, useContext, useEffect } from 'react'
import { Task } from './Task'
import { CopyListButton, AddTaskButton, DeleteListButton } from './Buttons'
import { Context } from '../context'

export const Panel = React.memo(props => {

  const { id, name, highlight, tasks } = props
  const animation = highlight ? { animationName: 'highlight' } : {}
  const divPanel = useRef(null);
  const { deleteList, editListName} = useContext(Context)

  useEffect(() => {
    const resizeListener = () => {
      const rect = divPanel.current.getBoundingClientRect()
      props.updatePanelHeights(id, rect.height)
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  },[])

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
               onChange={(event) => handleChange(id, event)}
        />
        <CopyListButton id={id}/>
        <DeleteListButton removeHandler={() => removeHandler(id)}/>
      </div>
      {renderTasks()}
      <AddTaskButton id={id}/>
    </div>
  );
})

