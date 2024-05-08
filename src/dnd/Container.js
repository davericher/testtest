import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import container, { dropHandlers } from 'kuika-smooth-dnd';

container.dropHandler = dropHandlers.reactDropHandler().handler;
container.wrapChild = p => p;

const Container = (props) => {
  const containerDivRef = useRef(null);
  const containerInstance = useRef(null);

  useEffect(() => {
    const getContainerOptions = () => {
      const functionProps = {
        onDragStart: props.onDragStart,
        onDragEnd: props.onDragEnd,
        onDrop: props.onDrop,
        getChildPayload: props.getChildPayload,
        shouldAnimateDrop: props.shouldAnimateDrop,
        shouldAcceptDrop: props.shouldAcceptDrop,
        onDragEnter: props.onDragEnter,
        onDragLeave: props.onDragLeave,
        onDropReady: props.onDropReady,
        getGhostParent: props.getGhostParent
      };
      return { ...props, ...functionProps };
    };

    const updateContainer = () => {
      if (containerInstance.current) {
        containerInstance.current.dispose();
      }
      if (containerDivRef.current) {
        containerInstance.current = container(containerDivRef.current, getContainerOptions());
      }
    };

    updateContainer();

    return () => {
      if (containerInstance.current) {
        containerInstance.current.dispose();
      }
    };
  }, [props]); // Dependencies array ensures effect runs on props change

  const setRef = element => {
    containerDivRef.current = element;
  };

  // Render function or default rendering
  if (props.render) {
    return props.render(setRef);
  } else {
    return (
      <div ref={setRef} style={props.style} className={props.className}>
        {props.children}
      </div>
    );
  }
};

Container.propTypes = {
  behaviour: PropTypes.oneOf(['move', 'copy', 'drag-zone']),
  groupName: PropTypes.string,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  style: PropTypes.object,
  dragHandleSelector: PropTypes.string,
  className: PropTypes.string,
  nonDragAreaSelector: PropTypes.string,
  dragBeginDelay: PropTypes.number,
  animationDuration: PropTypes.number,
  autoScrollEnabled: PropTypes.string,
  lockAxis: PropTypes.string,
  dragClass: PropTypes.string,
  dropClass: PropTypes.string,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDrop: PropTypes.func,
  getChildPayload: PropTypes.func,
  shouldAnimateDrop: PropTypes.func,
  shouldAcceptDrop: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  render: PropTypes.func,
  getGhostParent: PropTypes.func,
  removeOnDropOut: PropTypes.bool
};

Container.defaultProps = {
  behaviour: 'move',
  orientation: 'vertical',
  className: 'reactTrelloBoard'
};

export default Container;
