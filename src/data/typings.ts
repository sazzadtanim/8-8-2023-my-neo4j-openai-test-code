type node = {
  data: {
    id: string
    label: string
    type?: string
  }
}

type edge = {
  data: {
    source: string
    target: string
    label: string
  }
}

type target = {
  nodes: {
    data: {
      id: string
      label: string
      type?: string
    }
  }[]
  edges: {
    data: {
      source: string
      target: string
      label: string
    }
  }[]
}

export interface GraphAPIData {
  source: Source
  target: Target
  relationship: Relationship
}

export interface Relationship {
  identity: number
  start: number
  end: number
  type: Type
  properties: RelationshipProperties
}

export interface RelationshipProperties {
  license_plate: string
}

export type Type = 'OWNS'

export interface Source {
  identity: number
  labels: SourceLabel[]
  properties: SourceProperties
}

export type SourceLabel = 'Person'

export interface SourceProperties {
  income: number
  name: string
  pagerank: number
  age: number
  hobby: string
}

export interface Target {
  identity: number
  labels: TargetLabel[]
  properties: TargetProperties
}

export type TargetLabel = 'Vehicle'

export interface TargetProperties {
  model: string
}

type graphApi = {
  nodes: {
    data: {
      id: string
      label: string
      type?: string
    }
  }[]
  edges: {
    data: {
      source: string
      target: string
      label: string
    }
  }[]
}

export type { edge, graphApi, node }

export function convertToGraphData(apiJson: GraphAPIData[]): {
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
