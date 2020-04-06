import React from 'react'
import Task from './Task'
import ContentEditable from 'react-contenteditable'

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

  componentDidMount(){
    this.props.pushPanelHeight(this.props.id, this.divPanel.current.clientHeight)
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
    //alert('Panel')
    const { id, name }= this.props
    return (
      <div className="panel" ref={this.divPanel}>
        <div className="list-header list-row">
          <ContentEditable
              html={name}
              className="list-name"
              onChange={() => {this.handleChange(event, id)}}
            />
          <div className="list-btn"
               onClick={() => this.props.onClickListBtn('DeleteList', id)}>
            <i className="fas fa-trash btn-icon-pos"></i>
          </div>
          <div className="list-btn"
               onClick={() => this.props.onClickListBtn('CopyList', id)}>
            <i className="fas fa-copy btn-icon-pos"></i>
          </div>
        </div>
        {this.renderTasks()}
        <div className="add-task list-row"
             onClick={() => this.props.onClickListBtn('AddTask', id)}>
          <i className="fas fa-plus font-icon-r"></i>Add a task
        </div>
     </div>
    );
  }

}

export default Panel
