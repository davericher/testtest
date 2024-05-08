"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var REPLACE_TABLE = {
  customLaneHeader: 'components.LaneHeader',
  newLaneTemplate: 'components.NewLaneSection',
  newCardTemplate: 'components.NewCardForm',
  children: 'components.Card',
  customCardLayout: 'components.Card',
  addLaneTitle: '`t` function with key "Add another lane"',
  addCardLink: '`t` function with key "Click to add card"'
};
var warn = prop => {
  var use = REPLACE_TABLE[prop];
  console.warn("react-trello property '".concat(prop, "' is removed. Use '").concat(use, "' instead. More - https://github.com/rcdexta/react-trello/blob/master/UPGRADE.md"));
};
var _default = props => {
  Object.keys(REPLACE_TABLE).forEach(key => {
    if (props.hasOwnProperty(key)) {
      warn(key);
    }
  });
};
exports.default = _default;