import React, { useEffect, useState } from 'react';
// import { UserContext } from '../helpers/UserContext';
import usePrevious from '../../../hooks/usePrevious';
import "./Container.scss"
import './ContainerItem.scss'



export default function Container({children}) {


  // const {state} = useContext(UserContext);
  const [boundingBox, setBoundingBox] = useState({});
  const [prevBoundingBox, setPrevBoundingBox] = useState({});
  const prevChildren = usePrevious(children);
  
  // A hook used to update Bounding Boxes of Cointer Items on each Render
  useEffect(() => {
    console.log('Children', children)
    const newBoundingBox = calculateBoundingBoxes(children);

    setBoundingBox(newBoundingBox);
  }, [children]);

  // A hook used to keep track of previous state of children's Bounding Boxes:
  useEffect(() => {
    if(prevChildren && prevChildren.length > 1){
      const prevBoundingBox = calculateBoundingBoxes(prevChildren);
      setPrevBoundingBox(prevBoundingBox);
    }
  }, [prevChildren]);

  useEffect(() => {

    if (Object.keys(prevBoundingBox).length) {
      React.Children.forEach(children, child => {
        if(prevBoundingBox[child.key] && boundingBox[child.key]) {
        const domNode = child.ref.current;
        const firstBox = prevBoundingBox[child.key];
        const lastBox = boundingBox[child.key];
        const changeInX = firstBox.left - lastBox.left;

        if (changeInX) {
          requestAnimationFrame(() => {
            // Before the DOM paints, invert child to old position
            domNode.style.transform = `translateX(${changeInX}px)`;
            domNode.style.transition = "transform 0s";

            requestAnimationFrame(() => {
              // After the previous frame, remove
              // the transistion to play the animation
              domNode.style.transform = "";
              domNode.style.transition = "transform 500ms";
            });
          });
        }

        }
      });
    }
  }, [boundingBox, prevBoundingBox, children]);

  const calculateBoundingBoxes = children => {
    
    const boundingBoxes = {};

    React.Children.forEach(children, child => {

      const domNode = child.ref.current;
      const nodeBoundingBox = domNode.getBoundingClientRect();
      boundingBoxes[child.key] = nodeBoundingBox;

    });
  
    return boundingBoxes;
  };

  return (
    <div 
    className = "main-container">
      {children}
    </div>
  )
}
