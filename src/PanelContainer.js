import React from 'react'
import Panel from './Panel'
import AddListForm from './AddListForm'

class PanelContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPanels(){
    const lists = this.props.lists
    const panels = lists.map((list,index) => {
      return (
        <Panel key={list.id}
               id={list.id}
               name={list.name}
               tasks={list.tasks}
               onClickListBtn={(...args) => this.props.onClick(args)}
               onClickTaskBtn={(args) => this.props.onClick(args)}
               onChangeTask={(args) => this.props.onChangeTask(args)}
               onChangeList={(...args) => this.props.onChangeList(args)}
        />
      );
    });
    return panels
  }

  render(){
    const { addListVisible } = this.props
    return (
      <div className="bkground">
        <div className="panel-container">
          <AddListForm visible={addListVisible}
                        onClick={(...args) => this.props.onClick(args)}
          />
          {this.renderPanels()}
          <span className="panel break"></span>
          <span className="panel break"></span>
          <span className="panel break"></span>
        </div>
      </div>
    );
  }

}

export default PanelContainer
