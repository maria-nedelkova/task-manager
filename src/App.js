import React from 'react'
import PanelContainer from './PanelContainer'
import {getList, getTask, createTask, createList, replaceArrItem} from './ListUtil'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: this.props.lists,
      addListVisible: false,
      lastEditedList: '',
      lastEditedTask: '',
      dropDownVisible: false
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
      });
    });
  }

  editTask(args) {
    const listID = args[0]
    const taskID = args[1]
    const text = args[2]
    const list = getList(this.state.lists, listID)
    const task = getTask(list, taskID)
    const newTask = createTask(task.id, task.isDone, text)
    const updatedTasks = replaceArrItem(list.tasks, task, newTask)
    const newList = createList(list.id, list.name, updatedTasks)
    const updatedLists = replaceArrItem(this.state.lists, list, newList)
    const lastEditedTask = this.state.lastEditedTask
    this.setState({
      lists: updatedLists,
      lastEditedTask: task.id
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
        lists: updatedLists
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
        lists: updatedLists
      });
    });

  }

  addList(name) {
    this.sendRequest().then(id => {
      this.setState({
        lists: [...this.state.lists, {id, name, tasks:[]}]
      });
      this.setAddListVisibility(false)
    });
  }

  copyList(id) {
    const lists = this.state.lists
    const list = lists.find(list => {
      return list.id == id
    });
    const newListTasks = list.tasks.slice()
    this.sendRequest().then(newListID => {
      this.setState({
        lists: [...lists, {id: newListID,
                           name: list.name,
                           tasks: newListTasks}]
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
    const id = args[0]
    const name = args[1]
    const list = getList(this.state.lists, id)
    const newList = createList(list.id, name, list.tasks)
    const updatedLists = replaceArrItem(this.state.lists, list, newList)
    const lastEditedList = this.state.lastEditedList
    this.setState({
      lists: updatedLists,
      lastEditedList: list.id
    });
    if(lastEditedList == list.id) {
      clearTimeout(this.typingTimerList);
    }
    this.typingTimerList = setTimeout(() => {this.sendRequest().then((status) => {alert(status)})}, 5000)
  }

  handleClick(args) {
    const buttonType = args[0]
    if(buttonType == 'SetFormVisibility') {
      const visible = args[1]
      this.setAddListVisibility(visible)
    } else if(buttonType == 'AddList') {
        const title = args[1]
        this.addList(title)
    } else if(buttonType == 'DeleteList') {
        const id = args[1]
        this.deleteList(id)
    }  else if(buttonType == 'CopyList') {
       const id = args[1]
       this.copyList(id)
    } else if(buttonType == 'DeleteTask') {
       const listID = args[1]
       const taskID = args[2]
       this.deleteTask(listID, taskID)
    } else if(buttonType == 'ChangeTaskStatus') {
        const listID = args[1]
        const taskID = args[2]
        this.changeTaskStatus(listID, taskID)
    } else if(buttonType == 'AddTask') {
        const listID = args[1]
        this.addTask(listID)
    }
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

  render() {
    const { lists, addListVisible, dropDownVisible } = this.state
    const topNavClassName = dropDownVisible ? 'navbar-dark clearfix':'navbar clearfix'
    const dropDownClassName = dropDownVisible ? 'dropdown-menu-visible':'dropdown-menu-hidden'
    const barClassName = dropDownVisible ? 'bar-container bar-to-x':'bar-container'
    return (
      <div style={{height: '100%'}}>
        <div className={topNavClassName}>
          <div className="logo">
            <i className="fab fa-earlybirds"></i>Task Manager
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

export default App
