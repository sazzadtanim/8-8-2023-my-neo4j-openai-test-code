const layout = {
  name: 'breadthfirst',
  // fit: true,
  circle: true,
  directed: true,
  padding: 50,
  spacingFactor: 1.5,
  animate: true,
  animationDuration: 1000,

  avoidOverlap: true,
  nodeDimensionsIncludeLabels: false,
}

const styleSheet = [
  {
    selector: 'node',
    style: {
      backgroundColor: '#4a56a6',
      width: 30,
      height: 30,
      label: 'data(label)',

      // "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
      // "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
      // "text-valign": "center",
      // "text-halign": "center",
      'overlay-padding': '6px',
      'z-index': 10,
      //text props
      'text-outline-color': '#4a56a6',
      'text-outline-width': '2px',
      color: 'white',
      fontSize: 20,
    },
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': '6px',
      'border-color': '#AAD8FF',
      'border-opacity': '0.5',
      'background-color': '#77828C',
      width: 50,
      height: 50,
      //text props
      'text-outline-color': '#77828C',
      'text-outline-width': 8,
    },
  },
  {
    selector: "node[type='device']",
    style: {
      shape: 'circle',
    },
  },
  {
    selector: 'edge',
    style: {
      width: 3,
      // "line-color": "#6774cb",
      'line-color': '#AAD8FF',
      'target-arrow-color': '#6774cb',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
    },
  },
]

export { layout, styleSheet }

