import React from 'react'
import PanelContainer from './PanelContainer'
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

  setAddListVisibility(visible) {
    this.setState({
      addListVisible: visible
    });
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9)
  }

  addTask(listID) {
    const id = this.generateId()
    const lists = this.state.lists
    const list = lists.find(list => list.id == listID)
    const updatedTasks = [...list.tasks, { id, isDone: false, text: '' }]
    const updatedLists = lists.map(list => list.id == listID ? { ...list, tasks: updatedTasks } : list)
    this.setState({
      lists: updatedLists,
      highlight: false
    });
  }

  editTask([listID, taskID, text]) {
    const lists = this.state.lists
    const list = lists.find(list => list.id == listID)
    const task = list.tasks.find(task => task.id == taskID)
    const updatedTasks = list.tasks.map(task => task.id == taskID ? {...task, text}:task)
    const updatedLists = lists.map(list => list.id == listID ? {...list, tasks: updatedTasks}:list)
    const lastEditedTask = this.state.lastEditedTask
    this.setState({
      lists: updatedLists,
      lastEditedTask: task.id,
      highlight: false
    });
  }

  deleteTask(listID, taskID) {
      const lists = this.state.lists
      const list = lists.find(list => list.id == listID)
      const updatedTasks = list.tasks.filter(task => task.id != taskID)
      const updatedLists = lists.map(list => list.id == listID ? {...list, tasks: updatedTasks}:list)
      this.setState({
        lists: updatedLists,
        highlight: false
      });
  }

  changeTaskStatus(listID, taskID) {
      const lists = this.state.lists
      const list = lists.find(list => list.id == listID)
      const task = list.tasks.find(task => task.id == taskID)
      const updatedTasks = list.tasks.map(task => task.id == taskID ? {...task, isDone: !task.isDone}:task)
      const updatedLists = lists.map(list => list.id == listID ? {...list, tasks: updatedTasks}:list)
      this.setState({
        lists: updatedLists,
        highlight: false
      });
  } 

  addList(name) {
    const id = this.generateId();
      const lists = this.state.lists.slice()
      lists.unshift({id, name, tasks:[]})
      this.setState({
        lists: lists,
        highlight: true
      });
      this.setAddListVisibility(false)
  }

  copyList(id) {
    const lists = this.state.lists.slice()
    const list = lists.find(list => list.id == id)
    const newListTasks = list.tasks.slice()
      const index = lists.indexOf(list)
      lists.splice(index + 1, 0, {
        id: this.generateId(),
        name: list.name,
        tasks: newListTasks
      })
      this.setState({
        lists: lists,
        highlight: true
      });
  }

  deleteList(id) {
      const lists = this.state.lists
      this.setState({
        lists: lists.filter(list => list.id !== id)
      });
  }

  editListName([id, name]) {
    const lists = this.state.lists
    const list = lists.find(list => list.id == id)
    const updatedLists = lists.map(list => list.id == id ? {...list, name}:list)
    const lastEditedList = this.state.lastEditedList
    this.setState({
      lists: updatedLists,
      lastEditedList: list.id,
      highlight: false
    });
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

  componentDidMount() {
    const saved = JSON.parse(localStorage.getItem('todoLists') || '[]')
    this.setState({
      lists: saved
    });
  }

  componentDidUpdate() {
    localStorage.setItem('todoLists', JSON.stringify(this.state.lists))
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
