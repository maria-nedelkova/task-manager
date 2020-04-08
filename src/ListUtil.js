const getList = (lists, listID) => lists.find(list => list.id == listID)
const getTask = (list, taskID) => list.tasks.find(task => task.id == taskID)

const createTask = (id, isDone, text) => {
  return {id, isDone, text}
}

const createList = (id, name, tasks) => {
  return {id, name, tasks}
}

const replaceArrItem = (arr, oldItem, newItem) => {
  const newArr = arr.slice()
  const index = newArr.indexOf(oldItem)
  newArr.splice(index,1,newItem)
  return newArr
}

export {getList, getTask, createTask, createList, replaceArrItem}
