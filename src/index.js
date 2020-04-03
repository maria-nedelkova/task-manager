import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './MainPageIni.css'
import './ListStyles.css'
import './bg.jpg';

const LISTS = [
  {id: 1, name: 'List1', tasks:
                                 [
                                   {id: 1, isDone: false, text: 'Change css for addlist mobile layoutttt'},
                                   {id: 2, isDone: false, text: 'Maintain height'},
                                   {id: 3, isDone: false, text: 'Add "Edit name" button'},
                                   {id: 4, isDone: false, text: 'task4'},
                                 ]
  },
  {id: 2, name: 'List2', tasks:
                                 [
                                   {id: 1, isDone: false, text: 'task1'},
                                   {id: 2, isDone: false, text: 'task2'},
                                   {id: 3, isDone: false, text: 'task3'},
                                   {id: 4, isDone: false, text: 'task4'},
                                   {id: 5, isDone: false, text: 'task5'},
                                 ]
  },
  {id: 3, name: 'List3', tasks:
                                 [
                                   {id: 1, isDone: false, text: 'task1'},
                                   {id: 2, isDone: false, text: 'task2'},
                                   {id: 3, isDone: false, text: 'task3'},
                                   {id: 4, isDone: false, text: 'task4'},
                                 ]
  },
  {id: 4, name: 'List4', tasks:
                                 [
                                   {id: 1, isDone: false, text: 'task1'},
                                   {id: 2, isDone: false, text: 'task2'},
                                   {id: 3, isDone: false, text: 'task3'},
                                   {id: 4, isDone: false, text: 'task4'},
                                   {id: 5, isDone: false, text: 'task5'},
                                   {id: 6, isDone: false, text: 'task6'},
                                 ]
  },
  {id: 5, name: 'List5', tasks:
                                 [
                                   {id: 1, isDone: false, text: 'task1'},
                                   {id: 2, isDone: false, text: 'task2'},
                                 ]
  },
  {id: 6, name: 'List6', tasks:
                                 [
                                   {id: 1, isDone: false, text: 'task1'},
                                   {id: 2, isDone: false, text: 'task2'},
                                 ]
  },
]

ReactDOM.render(<App lists={LISTS}/>, document.getElementById('root'));
