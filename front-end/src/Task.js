import React from 'react'
import ContentEditable from 'react-contenteditable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
  }

  handleChange(event, listID, id) {
    const text = event.target.innerHTML
    this.props.onChange(listID, id, text)
  }

  shouldComponentUpdate(nextProps) {
    const differentByTaskStatus = nextProps.isDone != this.props.isDone
    const differentByText = nextProps.text != this.props.text
    return differentByTaskStatus || differentByText
  }

  componentDidMount() {
    if(!this.props.text) {
      this.contentEditable.current.focus();
    }
  }

  render(){
    const { id, listID, isDone, text } = this.props
    const contentClassName = isDone ? 'text-area-green':'text-area'
    const disabled = isDone ? true:false
    return (
      <div className="list-row">
        <ContentEditable
            innerRef={this.contentEditable}
            html={text}
            disabled={disabled}
            className={contentClassName}
            onChange={() => {this.handleChange(event, listID, id)}}
          />
        <div className="list-btn"
             onClick={() => this.props.onClick('DeleteTask', listID, id)}>
          <FontAwesomeIcon icon={faTrash} className="btn-icon"/>
        </div>
        <div className="list-btn"
             onClick={() => this.props.onClick('ChangeTaskStatus', listID, id)}>
          <FontAwesomeIcon icon={faCheck} className="btn-icon"/>
        </div>
      </div>
    );
  }

}

export default Task