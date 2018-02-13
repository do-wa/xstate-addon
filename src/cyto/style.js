const style = [
  {
    selector: 'node',
    style: {
      padding: '20px',
      'text-valign': ele => (ele.data('hasChildren') ? 'top' : 'center'),
      'text-halign': 'center',
      'background-color': 'white',
      'border-color': ele => {
        return ele.data('selected') ? 'red' : 'black';
      },
      'border-width': 1,
      shape: 'roundrectangle',
      label: 'data(key)'
    }
  },
  {
    selector: 'edge',
    style: {
      width: 1,
      'line-color': 'black',
      'text-background-opacity': 1,
      'text-background-color': '#ffffff',
      'target-arrow-color': 'black',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',

      label: 'data(key)'
    }
  }
];

export default style;
