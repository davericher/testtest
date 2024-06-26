import React from 'react';

import Draggable from './dnd/Draggable';
import Container from './dnd/Container';
import BoardContainer from './controllers/BoardContainer';
import Board from './controllers/Board';
import Lane from './controllers/Lane';
import deprecationWarnings from './helpers/deprecationWarnings';
import DefaultComponents from './components';
import locales from './locales';

import widgets from './widgets';

import createTranslate from './helpers/createTranslate';
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

export { Draggable, Container, BoardContainer, Lane, createTranslate, locales, widgets };

export { DefaultComponents as components };

const DEFAULT_LANG = 'en';

// Enhanced default export using arrow function for simplicity
const TrelloBoard = ({ components, lang = DEFAULT_LANG, ...otherProps }) => {
  deprecationWarnings(otherProps);
  const translate = createTranslate(locales[lang]?.translation || {});
  return<StyleSheetManager shouldForwardProp={shouldForwardProp}>
    <Board t={translate} components={{ ...DefaultComponents, ...components }} {...otherProps} />;
  </StyleSheetManager>
};

const shouldForwardProp = (propName, target) => {
  if (typeof target === 'string') {
    return isPropValid(propName);
  }
  return true;
}

export default TrelloBoard;
