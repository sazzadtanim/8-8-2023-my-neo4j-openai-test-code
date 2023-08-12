import CytoscapeComponent from 'react-cytoscapejs'

interface Props {
  data: GraphAPIData[]
  width: number | string
  height: number | string
}

export default function GraphResponseChatMessage(props: Props) {
  const graphData = convertToGraphData(props.data)

  return (
    <CytoscapeComponent
      elements={CytoscapeComponent.normalizeElements(graphData)}
      // pan={{ x: 200, y: 200 }}
      style={{ width: props.width, height: props.height }}
      zoomingEnabled={true}
      maxZoom={3}
      minZoom={0.1}
      autounselectify={false}
      boxSelectionEnabled={true}
      layout={layout}
      stylesheet={styleSheet}
    />
  )
}

const layout: cytoscape.LayoutOptions = {
  name: 'concentric',
  fit: true,
  // circle: true,
  // directed: true,
  padding: 50,
  spacingFactor: 1.5,
  animate: true,
  animationDuration: 1000,
  avoidOverlap: true,
  // nodeDimensionsIncludeLabels: false,
}

const styleSheet: string | cytoscape.Stylesheet | cytoscape.Stylesheet[] = [
  {
    selector: 'node',
    style: {
      backgroundColor: 'cyan',
      width: 10,
      height: 10,
      label: 'data(label)',
      'text-valign': 'center',
      'text-halign': 'center',
      'overlay-padding': '6px',
      'z-index': 10,
      //text props
      'text-outline-color': '#4a56a6',
      color: 'white',
      'font-size': 6,
    },
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': '6px',
      'border-color': '#AAD8FF',
      'border-opacity': 0.5,
      'background-color': 'red',
      width: 30,
      height: 30,
      //text props
      'text-outline-color': '#77828C',
      'text-outline-width': 2,
    },
  },

  {
    selector: 'edge',
    style: {
      width: 1,
      'line-color': 'red',
      'target-arrow-color': '#6774cb',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
    },
  },
]

function convertToGraphData(apiJson: GraphAPIData[]): {
  nodes: cytoscape.ElementDefinition[]
  edges: cytoscape.ElementDefinition[]
} {
  let nodes: cytoscape.ElementDefinition[] = []
  let edges: cytoscape.ElementDefinition[] = []

  apiJson.forEach(item => {
    nodes.push({
      data: {
        id: item.target.identity.toString(),
        label: item.target.properties.model,
      },
    })
    nodes.push({
      data: {
        id: item.source.identity.toString(),
        label: item.source.properties.name,
      },
    })

    edges.push({
      data: {
        source: item.source.identity.toString(),
        target: item.target?.identity.toString(),
        label: item?.relationship.type,
      },
    })
  })
  return { nodes: nodes, edges: edges }
}

interface GraphAPIData {
  source: Source
  target: Target
  relationship: Relationship
}

interface Relationship {
  identity: number
  start: number
  end: number
  type: string
  properties: RelationshipProperties
}

interface RelationshipProperties {
  license_plate: string
}

interface Source {
  identity: number
  labels: string[]
  properties: {
    income: number
    name: string
    pagerank: number
    age: number
    hobby: string
  }
}

interface Target {
  identity: number
  labels: string[]
  properties: {
    model: string
  }
}
