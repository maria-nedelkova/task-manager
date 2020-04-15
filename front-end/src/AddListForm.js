import React from 'react'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'

class AddListForm extends React.Component {
  constructor(props) {
    super(props)
    this.initialState = {
      title: '',
      errors: ['Please, enter list title'],
    }
    this.state = this.initialState
    this.divAddListForm = React.createRef();
  }

  handleChange(event) {
    const title = event.target.value
    const errors = []
    if(!title) {
      errors.push('Please, enter list title')
    } else {
      if(!title.match(/^[a-zA-Z0-9öäåÖÄÅ]+$/)) {
        errors.push('Title should contain only letters and numbers')
      }
    }
    this.setState({
      title: event.target.value,
      errors: errors
    });
  }

  handleAddList() {
    const errors = this.state.errors
    const formIsValid = errors.length > 0 ? false : true
    if(formIsValid){
      this.props.onClick('AddList', this.state.title)
      this.setState(this.initialState)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: errors.join("<br>"),
        backdrop: false,
        confirmButtonColor: '#4CAF50',
      })

    }
  }

  handleCross() {
    this.props.onClick('SetFormVisibility', false)
    this.setState(this.initialState)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const differentByVisibility = nextProps.visible != this.props.visible
    const differentByTitle = nextState.title != this.state.title
    return differentByVisibility || differentByTitle
  }

  render(){
   const { visible } = this.props
   const { title } = this.state
   if(visible){
     return (
       <div className="panel" ref={this.divAddListForm}>
         <input className="input list-row"
                type="text"
                value={title}
                placeholder="Enter list title..."
                maxLength="15"
                onChange={() => this.handleChange(event)}
          />
         <button className="green-btn"
                 onClick={() => this.handleAddList()}>Add List
         </button>
         <FontAwesomeIcon icon={faTimes}
                          className="cross"
                          onClick={() => this.handleCross()}
         />
       </div>
     );
    } else{
     return (
       <div className="add-list panel"
            ref={this.divAddListForm}
            onClick={() => this.props.onClick('SetFormVisibility', true)}>
         <FontAwesomeIcon icon={faPlus} className="plus-icon"/>
  			 <div className="add-text">Add a new list</div>
       </div>
     );
   }
 }

 componentDidMount(){
   const rect = this.divAddListForm.current.getBoundingClientRect()
   this.props.pushPanelHeight(0, rect.height)
 }

 componentDidUpdate() {
   const rect = this.divAddListForm.current.getBoundingClientRect()
   this.props.updatePanelHeight(0, rect.height)
 }

}

export default AddListForm
