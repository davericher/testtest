import React, { useState } from 'react'
import { Provider } from 'react-redux'
import classNames from 'classnames'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import uuidv1 from 'uuid/v1'
import BoardContainer from './BoardContainer'
import boardReducer from '../reducers/BoardReducer'

const middlewares = process.env.REDUX_LOGGING ? [logger] : []

const Board = ({ id, className, components }) => {
  const [storeId] = useState(id || uuidv1())
  const [store] = useState(() => createStore(boardReducer, applyMiddleware(...middlewares)))

  const allClassNames = classNames('react-trello-board', className || '')

  return (
    <Provider store={store}>
      <>
        <components.GlobalStyle />
        <BoardContainer id={storeId} className={allClassNames} />
      </>
    </Provider>
  )
}

export default Board