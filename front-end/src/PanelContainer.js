import React, { useState, useEffect } from 'react'
import { Panel } from './Panel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const PanelContainer = ({ lists, panelToHighlight, onAdd }) => {

  const panelHeightsTemp = []
  const [panelHeights, setPanelHeights] = useState([])

  useEffect(() => {
    const resizeListener = () => window.location.reload(true)
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  const calculateColumnHeight = (panelsHeight, numberOfColumns, position) => {
    let columnHeight = 0
    const numberOfPanels = panelsHeight.length
    while (position < numberOfPanels) {
      columnHeight += panelsHeight[position]
      columnHeight += 15                                                            //plus margin
      position += numberOfColumns
    }
    return columnHeight + 25                                                      // plus padding
  }

  const calculateContainerHeight = panels => {
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    const numberOfColumns = width > 1100 ? 4 :
      width <= 1100 && width > 900 ? 3 :
        width <= 900 && width > 600 ? 2 :
          1
    const defaultHeight = width > 1100 ? 600 :
      width <= 1100 && width > 900 ? 500 :
        width <= 900 && width > 600 ? 400 :
          300
    const columnsHeight = []
    const heights = panels.map(panel => panel.height)
    heights.unshift(40) // the first static panel
    for (let i = 0; i < numberOfColumns; i++) {
      columnsHeight[i] = calculateColumnHeight(heights, numberOfColumns, i)
    }
    const maxHeight = Math.max(...columnsHeight)
    const containerHeight = maxHeight > defaultHeight ? maxHeight : defaultHeight
    return containerHeight  
  }

  const pushPanelHeight = (id, height) => {
    panelHeightsTemp.push({id, height})
    if(panelHeightsTemp.length == lists.length) { //change state only once, after all panel heights have been pushed
      setPanelHeights(panelHeightsTemp)
    }
    if(panelHeightsTemp.length == 1 && panelHeights.length) { //some panel is changed or new one is added
      const panel = panelHeights.find(panel => panel.id == id)
      if(panel) {
        const updatedPanelHeights = panelHeights.map(panel => panel.id == id ? { ...panel, height} : panel)
        setPanelHeights(updatedPanelHeights)
      } else {
        const addedList = lists.find(list => list.id == id)
        const index = lists.indexOf(addedList)
        const updatedPanelHeights = panelHeights.slice()
        updatedPanelHeights.splice(index,0,{id,height})
        setPanelHeights(updatedPanelHeights)
      }
    }
  }

  const deletePanelHeight = id => {
      const updatedPanelHeights = panelHeights.filter(panel => panel.id !== id)
      setPanelHeights(updatedPanelHeights)
  }

  const renderPanels = () => {
    const panels = lists.map((list, index) => {
      const highlight = list.id == panelToHighlight ? true : false
      return (
        <Panel key={list.id}
          id={list.id}
          name={list.name}
          tasks={list.tasks}
          highlight={highlight}
          pushPanelHeight={pushPanelHeight}
          deletePanelHeight={deletePanelHeight}
        />
      );
    });
    return panels
  }

  return (
    <div className="bkground panel-container" style={{ height: calculateContainerHeight(panelHeights)}}>
      
        <div className="add-list panel"
          onClick={onAdd.bind(null)}>
          <FontAwesomeIcon icon={faPlus} className="plus-icon" />
          <div className="add-text">Add a new list</div>
        </div>
        {renderPanels()}
        <span className="panel break"></span>
        <span className="panel break"></span>
        <span className="panel break"></span>
    
    </div>
  );
}

