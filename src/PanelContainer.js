import React from 'react'
import Panel from './Panel'
import AddListForm from './AddListForm'

class PanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.panelsHeight = []
  }

  pushPanelHeight(id, height) {
    this.panelsHeight.push({id, height})
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
               pushPanelHeight={(id, height) => this.pushPanelHeight(id, height)}
        />
      );
    });
    return panels
  }

  componentDidMount() {
    this.props.calculateContainerHeight(this.panelsHeight)
  }

  render(){
    const { addListVisible, containerHeight } = this.props
    return (
      <div className="bkground">
        <div className="panel-container" style={{height: containerHeight}}>
          <AddListForm visible={addListVisible}
                        onClick={(...args) => this.props.onClick(args)}
                        pushPanelHeight={(id, height) => this.pushPanelHeight(id, height)}
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
