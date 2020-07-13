import React from 'react'
import Panel from './Panel'
import AddListForm from './AddListForm'

class PanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.panelsHeight = []
                                                     // stores heights of each panel. Panel represents a list or the AddListForm
  }

  pushPanelHeight(id, height) {
    const panelsHeight = this.panelsHeight
    const lists = this.props.lists
    panelsHeight.push({id, height})
    const pushIsCompleted = panelsHeight.length > lists.length                  // panelsHeight always has 1 more item - AddListForm
    if(pushIsCompleted) {
      if(panelsHeight[panelsHeight.length-1].id != lists[lists.length-1].id) {  // a list was added in the beginning or in the middele of lists
        const pushedItem = panelsHeight.pop()                                   // it means panelsHeight should be adjusted. Order is important for correct layout rendering.
        const index = lists.indexOf(lists.find(list => list.id == id))                          // find a position, where a pushed item should be placed
        panelsHeight.splice(index + 1,0,pushedItem)                             // plus 1, since panelsHeight always starts with AddListForm item
      }
      this.props.calculateContainerHeight(panelsHeight)
    }
  }

  updatePanelHeight(id, height) {
    const panel = this.panelsHeight.find(panel => panel.id == id)
    panel.height = height
    this.props.calculateContainerHeight(this.panelsHeight)
  }

  deletePanelHeight(id) {
    this.panelsHeight = this.panelsHeight.filter(panel => panel.id !== id)
    this.props.calculateContainerHeight(this.panelsHeight)
  }

  renderPanels(){
    const { lists, highlight } = this.props
    const panels = lists.map((list,index) => {
      return (
        <Panel key={list.id}
               id={list.id}
               name={list.name}
               tasks={list.tasks}
               highlight={highlight}
               onClickListBtn={(...args) => this.props.onClick(args)}
               onClickTaskBtn={(args) => this.props.onClick(args)}
               onChangeTask={(args) => this.props.onChangeTask(args)}
               onChangeList={(...args) => this.props.onChangeList(args)}
               pushPanelHeight={(id, height) => this.pushPanelHeight(id, height)}
               updatePanelHeight={(id, height) => this.updatePanelHeight(id, height)}
               deletePanelHeight={(id) => this.deletePanelHeight(id)}
        />
      );
    });
    return panels
  }

  render(){
    const { addListVisible, containerHeight } = this.props
    return (
      <div className="bkground">
        <div className="panel-container" style={{height: containerHeight}}>
          <AddListForm visible={addListVisible}
                       onClick={(...args) => this.props.onClick(args)}
                       pushPanelHeight={(id, height) => this.pushPanelHeight(id, height)}
                       updatePanelHeight={(id, height) => this.updatePanelHeight(id, height)}
          />
          {this.renderPanels()}
          <span className="panel break"></span>
          <span className="panel break"></span>
          <span className="panel break"></span>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const resizeListener = () => window.location.reload(true)
    window.addEventListener('resize', resizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', resizeListener);
  }

}

export default PanelContainer
