import React, {useState} from 'react'
import {Provider} from 'react-redux'
import classNames from 'classnames'
import {configureStore} from '@reduxjs/toolkit'
import {v1} from 'uuid'
import BoardContainer from './BoardContainer'
import boardReducer from '../reducers/BoardReducer'

const Board = ({id, className, components, ...additionalProps}) => {
  const [storeId] = useState(id || v1())
  const [store] = useState(() =>
    configureStore({
      reducer: boardReducer,
      middleware: getDefaultMiddleware => getDefaultMiddleware()
    })
  )

  const allClassNames = classNames('react-trello-board', className || '')

  return (
    <Provider store={store}>
      <>
        <components.GlobalStyle />
        <BoardContainer components={components} {...additionalProps} id={storeId} className={allClassNames} />
      </>
    </Provider>
  )
}

export default Board
