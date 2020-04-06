import React from 'react'
import Swal from 'sweetalert2'

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

  componentDidMount(){
    this.props.pushPanelHeight(0, this.divAddListForm.current.clientHeight)
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
         <i className="fas fa-times cross"
            onClick={() => this.handleCross()}>
         </i>
       </div>
     );
    } else{
     return (
       <div className="panel add-list" ref={this.divAddListForm}>
         <div style={{padding: '5px'}}
              onClick={() => this.props.onClick('SetFormVisibility', true)}>
            <i className="fas fa-plus font-icon-r"></i>Add a new list
         </div>
       </div>
     );
   }
 }

}

export default AddListForm
