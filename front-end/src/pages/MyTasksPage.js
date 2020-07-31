import React, { useState, useEffect } from 'react'
import { PanelContainer } from '../components/PanelContainer'
import { Context } from '../context'

export const MyTasksPage = () => {
  const [lists, setLists] = useState([])
  const [panelToHighlight, setPanelToHighlight] = useState('')

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todoLists') || '[]');
    setLists(saved);
  }, [])

  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify(lists))
  }, [lists])

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9)
  }

  const addTask = listID => {
    const id = generateId()
    const list = lists.find(list => list.id == listID)
    const updatedTasks = [...list.tasks, { id, isDone: false, text: '' }]
    const updatedLists = lists.map(list => list.id == listID ? { ...list, tasks: updatedTasks } : list)
    setLists(updatedLists)
    setPanelToHighlight('')

  }

  const editTask = (listID, taskID, text) => {
    const list = lists.find(list => list.id == listID)
    const task = list.tasks.find(task => task.id == taskID)
    const updatedTasks = list.tasks.map(task => task.id == taskID ? { ...task, text } : task)
    const updatedLists = lists.map(list => list.id == listID ? { ...list, tasks: updatedTasks } : list)
    setLists(updatedLists)
    setPanelToHighlight('')
  }

  const deleteTask = (listID, taskID) => {
    const list = lists.find(list => list.id == listID)
    const updatedTasks = list.tasks.filter(task => task.id != taskID)
    const updatedLists = lists.map(list => list.id == listID ? { ...list, tasks: updatedTasks } : list)
    setLists(updatedLists)
    setPanelToHighlight('')
  }

  const changeTaskStatus = (listID, taskID) => {
    const list = lists.find(list => list.id == listID)
    const task = list.tasks.find(task => task.id == taskID)
    const updatedTasks = list.tasks.map(task => task.id == taskID ? { ...task, isDone: !task.isDone } : task)
    const updatedLists = lists.map(list => list.id == listID ? { ...list, tasks: updatedTasks } : list)
    setLists(updatedLists)
    setPanelToHighlight('')
  }

  const addList = () => {
    const id = generateId();
    const updatedLists = lists.slice()
    updatedLists.unshift({ id, name: '', tasks: [] })
    setLists(updatedLists)
    setPanelToHighlight(id)

  }

  const copyList = id => {
    const updatedLists = lists.slice()
    const listToCopy = lists.find(list => list.id == id)
    const tasksToCopy = listToCopy.tasks.slice()
    const index = updatedLists.indexOf(listToCopy)
    const newListId = generateId()
    updatedLists.splice(index + 1, 0, {
      id: newListId,
      name: listToCopy.name,
      tasks: tasksToCopy
    })
    setLists(updatedLists)
    setPanelToHighlight(newListId)
  }

  const deleteList = id => {
    setLists(prev => prev.filter(list => list.id !== id))
  }

  const editListName = (id, name) => {
    const list = lists.find(list => list.id == id)
    const updatedLists = lists.map(list => list.id == id ? { ...list, name } : list)
    setLists(updatedLists)
    setPanelToHighlight('')
  }

  const handleMenuClick = () => {
    dropDownVisible ? setDropDownVisibility(false) : setDropDownVisibility(true)
  }

  return (
    <Context.Provider value={{
      addTask, deleteTask, changeTaskStatus, editTask, deleteList, copyList, editListName
    }}>
      <PanelContainer lists={lists}
        onAdd={addList}
        panelToHighlight={panelToHighlight}
      />
    </Context.Provider>
  );
}

