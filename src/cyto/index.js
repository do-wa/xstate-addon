import c from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';

import layout from './layout';
import style from './style';

c.use(coseBilkent);
let cy;
export const render = (domElement, graph, onEventClicked) => {
  cy = c({
    container: domElement,
    layout,
    elements: graph,
    style
  });
  cy.on('tap', evt => {
    const target = evt.target;
    if (target.group && target.group() === 'edges') {
      onEventClicked(target.data('key'));
    }
  });
  const resetSelected = () => {
    const curEles = cy.filter((ele, i) => ele.data('selected'));
    curEles.forEach(element => {
      element.data('selected', false);
      element.style('border-color', 'black');
    });
  };
  const setAsSelected = id => {
    const nextEl = cy.getElementById(id);
    nextEl.style('border-color', 'red');
    nextEl.data('selected', true);
  };
  return {
    setState(next) {
      resetSelected();
      if (typeof next === 'string') {
        setAsSelected(next);
      } else {
        const nextEles = Object.keys(next);
        nextEles.forEach(key => {
          setAsSelected(key);
          setAsSelected(`${key}.${next[key]}`);
        });
      }
    },
    resize() {
      cy.resize();
      cy.fit();
    }
  };
};
