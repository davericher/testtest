import React from 'react';
import PropTypes from 'prop-types';
import { constants } from 'kuika-smooth-dnd';

const { wrapperClass } = constants;

const Draggable = ({ render, className, children, ...props }) => {
  if (render) {
    // Use React.cloneElement to append the class to the rendered component
    return React.cloneElement(render(), { className: `${className ? className + ' ' : ''}${wrapperClass}` });
  }

  // Construct the class name from props, appending the wrapperClass
  const clsName = `${className ? className + ' ' : ''}${wrapperClass}`;
  return (
    <div {...props} className={clsName}>
      {children}
    </div>
  );
};

Draggable.propTypes = {
  render: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
};

export default Draggable;
