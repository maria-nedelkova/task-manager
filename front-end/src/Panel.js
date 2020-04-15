import React from 'react'
import Task from './Task'
import ContentEditable from 'react-contenteditable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCopy, faPlus } from '@fortawesome/free-solid-svg-icons'

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.divPanel = React.createRef();
  }

  renderTasks(){
    const arrOfTasks = this.props.tasks
    const listID = this.props.id
    if(arrOfTasks.length > 0) {
      const tasks = arrOfTasks.map(task => {
        return (
          <Task key= {task.id}
                id = {task.id}
                listID = {listID}
                isDone = {task.isDone}
                text = {task.text}
                onClick = {(...args) => this.props.onClickTaskBtn(args)}
                onChange = {(...args) => this.props.onChangeTask(args)}
          />
        );
      });
      return tasks
    } else {
      return false
    }
  }

  handleChange(event, id) {
    const name = event.target.innerHTML
    this.props.onChangeList(id, name)
  }

  shouldComponentUpdate(nextProps) {
   const newTasks = nextProps.tasks
   const oldTasks = this.props.tasks
   let differentByTaskStatus = false
   let differentByText = false
   const differentByName = nextProps.name != this.props.name
   const differentByLength = newTasks.length != oldTasks.length
   if (!differentByLength) {
     newTasks.forEach((newTask, i) => {
       if(newTask.isDone != oldTasks[i].isDone) {
         differentByTaskStatus = true
       }
       if(newTask.text != oldTasks[i].text) {
         differentByText = true
       }
     });
   }
   return differentByName || differentByLength || differentByTaskStatus || differentByText
  }

  render(){
    const { id, name, highlight }= this.props
    const animation = highlight ? {animationName: 'highlight'}:{}
    return (
        <div className='panel' ref={this.divPanel} style={animation}>
        <div className="list-header list-row">
          <ContentEditable
              html={name}
              className="list-name"
              onChange={() => {this.handleChange(event, id)}}
            />
          <div className="list-btn"
               onClick={() => this.props.onClickListBtn('DeleteList', id)}>
            <FontAwesomeIcon icon={faTrash} className="btn-icon"/>
          </div>
          <div className="list-btn"
               onClick={() => this.props.onClickListBtn('CopyList', id)}>
            <FontAwesomeIcon icon={faCopy} className="btn-icon"/>
          </div>
        </div>
        {this.renderTasks()}
        <div className="add-task-btn list-row"
             onClick={() => this.props.onClickListBtn('AddTask', id)}>
          <FontAwesomeIcon icon={faPlus} className="plus-icon"/>
   		    <div className="add-text">Add a task</div>
        </div>
     </div>
    );
  }

  componentDidMount() {
    const rect = this.divPanel.current.getBoundingClientRect()
    this.props.pushPanelHeight(this.props.id, rect.height)
  }

  componentDidUpdate() {
    const rect = this.divPanel.current.getBoundingClientRect()
    this.props.updatePanelHeight(this.props.id, rect.height)
  }

  componentWillUnmount() {
    this.props.deletePanelHeight(this.props.id)
  }

}

export default Panel
