import React from 'react'
import PanelContainer from './PanelContainer'
import {getList, getTask, createTask, createList, replaceArrItem} from './ListUtil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarlybirds } from '@fortawesome/free-brands-svg-icons'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: this.props.lists,
      addListVisible: false,
      lastEditedList: '',
      lastEditedTask: '',
      dropDownVisible: false,
      containerHeight: '600px',
      highlight: false
    };
    this.typingTimerTask = ''
    this.typingTimerList = ''
  }

  sendRequest(method, url) {
/*
    (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
      }
*/

    return new Promise((resolve,reject) => {
      let response
      setTimeout(() => {
        response = Math.random()
        resolve(response)
        },2000)
    });
  }

  setAddListVisibility(visible) {
    this.setState({
      addListVisible: visible
    });
  }

  addTask(listID) {
    this.sendRequest().then(id => {
      const list = getList(this.state.lists, listID)
      const newTask = createTask(id, false, '')
      const updatedTasks = [...list.tasks, newTask]
      const newList = createList(list.id, list.name, updatedTasks)
      const updatedLists = replaceArrItem(this.state.lists, list, newList)
      this.setState({
        lists: updatedLists,
        highlight: false
      });
    });
  }

  editTask(args) {
    const [listID, taskID, text] = args
    const list = getList(this.state.lists, listID)
    const task = getTask(list, taskID)
    const newTask = createTask(task.id, task.isDone, text)
    const updatedTasks = replaceArrItem(list.tasks, task, newTask)
    const newList = createList(list.id, list.name, updatedTasks)
    const updatedLists = replaceArrItem(this.state.lists, list, newList)
    const lastEditedTask = this.state.lastEditedTask
    this.setState({
      lists: updatedLists,
      lastEditedTask: task.id,
      highlight: false
    });
    if(lastEditedTask == task.id) {
      clearTimeout(this.typingTimerTask);
    }
    this.typingTimerTask = setTimeout(() => {this.sendRequest().then((status) => {alert(status)})}, 5000)

  }

  deleteTask(listID, taskID) {
    this.sendRequest().then(status => {
      const list = getList(this.state.lists, listID)
      const updatedTasks = list.tasks.filter(task => {
        return task.id != taskID
      });
      const newList = createList(list.id, list.name, updatedTasks)
      const updatedLists = replaceArrItem(this.state.lists, list, newList)
      this.setState({
        lists: updatedLists,
        highlight: false
      });
    });

  }

  changeTaskStatus(listID, taskID) {
    this.sendRequest().then(status => {
      const list = getList(this.state.lists, listID)
      const task = getTask(list, taskID)
      const newTask = createTask(task.id, !task.isDone, task.text)
      const updatedTasks = replaceArrItem(list.tasks, task, newTask)
      const newList = createList(list.id, list.name, updatedTasks)
      const updatedLists = replaceArrItem(this.state.lists, list, newList)
      this.setState({
        lists: updatedLists,
        highlight: false
      });
    });

  }

  addList(name) {
    this.sendRequest().then(id => {
      const lists = this.state.lists.slice()
      lists.unshift({id, name, tasks:[]})
      this.setState({
        lists: lists,
        highlight: true
      });
      this.setAddListVisibility(false)
    });
  }

  copyList(id) {
    const lists = this.state.lists.slice()
    const list = lists.find(list => list.id == id)
    const newListTasks = list.tasks.slice()
    this.sendRequest().then(newListID => {
      const index = lists.indexOf(list)
      lists.splice(index + 1,0,{id: newListID,
                            name: list.name,
                            tasks: newListTasks}
        );
      this.setState({
        lists: lists,
        highlight: true
      });
    });
  }

  deleteList(id) {
    this.sendRequest().then(status => {
      const lists = this.state.lists
      this.setState({
        lists: lists.filter(list => {
              return list.id !== id
        }),
      });
    });
  }

  editListName(args) {
    const [id, name] = args
    const list = getList(this.state.lists, id)
    const newList = createList(list.id, name, list.tasks)
    const updatedLists = replaceArrItem(this.state.lists, list, newList)
    const lastEditedList = this.state.lastEditedList
    this.setState({
      lists: updatedLists,
      lastEditedList: list.id,
      highlight: false
    });
    if(lastEditedList == list.id) {
      clearTimeout(this.typingTimerList);
    }
    this.typingTimerList = setTimeout(() => {this.sendRequest().then((status) => {alert(status)})}, 5000)
  }

  handleClick(args) {
    const buttons = {
      SetFormVisibility: () => {
        const visible = args[1]
        this.setAddListVisibility(visible)
      },
      AddList: () => {
        const title = args[1]
        this.addList(title)
      },
      CopyList: () => {
        const id = args[1]
        this.copyList(id)
      },
      DeleteList: () => {
        const id = args[1]
        this.deleteList(id)
      },
      AddTask: () => {
        const listID = args[1]
        this.addTask(listID)
      },
      ChangeTaskStatus: () => {
        const [,listID, taskID] = args
        this.changeTaskStatus(listID, taskID)
      },
      DeleteTask: () => {
        const [,listID, taskID] = args
        this.deleteTask(listID, taskID)
      },
    }
    const buttonType = args[0]
    buttons[buttonType]()
  }

  handleMenuClick() {
    if(this.state.dropDownVisible){
      this.setState({
        dropDownVisible: false
      });
    } else {
      this.setState({
        dropDownVisible: true
      });
    }
  }

  calculateContainerHeight(panels) {
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    const numberOfColumns = width > 1100 ? 4 :
                            width <= 1100 && width > 900 ? 3 :
                            width <= 900 && width > 600 ? 2 :
                            1
    const defaultHeight =  width > 1100 ? 600 :
                           width <= 1100 && width > 900 ? 500 :
                           width <= 900 && width > 600 ? 400 :
                           300
    const columnsHeight = []
    const panelsHeight = panels.map(panel => panel.height)
    for(let i = 0; i < numberOfColumns; i++) {
      columnsHeight[i] = calculateColumnHeight(panelsHeight,numberOfColumns,i)
    }
    const maxHeight = Math.max(...columnsHeight)
    const containerHeight = maxHeight > defaultHeight ? maxHeight: defaultHeight
    this.setState({
      containerHeight: containerHeight + 'px'
    });
  }

  render() {
    const { lists, addListVisible, dropDownVisible, containerHeight, highlight } = this.state
    const topNavClassName = dropDownVisible ? 'navbar-dark clearfix':'navbar clearfix'
    const dropDownClassName = dropDownVisible ? 'dropdown-menu-visible':'dropdown-menu-hidden'
    const barClassName = dropDownVisible ? 'bar-container bar-to-x':'bar-container'
    return (
      <div style={{height: '100%'}}>
        <div className={topNavClassName}>
          <div className="logo">
            <FontAwesomeIcon icon={faEarlybirds}/>Task Manager
          </div>
          <div className={barClassName} onClick={() => this.handleMenuClick()}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <div className={dropDownClassName}>
            <a href="#">Change Password</a>
            <a href="#">Log Out</a>
          </div>
        </div>
        <PanelContainer lists={lists}
                        addListVisible={addListVisible}
                        onClick={(args) => this.handleClick(args)}
                        onChangeTask={(args) => this.editTask(args)}
                        onChangeList={(args) => this.editListName(args)}
                        calculateContainerHeight={(panels) => this.calculateContainerHeight(panels)}
                        containerHeight={containerHeight}
                        highlight={highlight}
        />
        <footer className="footer">
          <div id="nav_links">
            <a href="#change password">Change Password</a>
            <a href="#logout">Log Out</a>
          </div>
          <div id="contact">
            <p><i className="fas fa-map-marker-alt font-icon-r"></i>Stockholm, Sweden</p>
            <p><i className="fas fa-phone-alt font-icon-r"></i>+00672351</p>
            <p><i className="fas fa-envelope font-icon-r"></i>mail@mail.com</p>
          </div>
        </footer>
      </div>

    );
  }
}

const calculateColumnHeight = (panelsHeight, numberOfColumns, position) => {
  let columnHeight = 0
  const numberOfPanels = panelsHeight.length
  while(position < numberOfPanels) {
    columnHeight += panelsHeight[position]
    columnHeight += 5                                                            //plus margin
    position += numberOfColumns
  }
  return columnHeight + 25                                                      // plus padding
}

export default App
