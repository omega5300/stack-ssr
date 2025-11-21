export interface Bundlephobia {
  assets: Asset[]
  dependencyCount: number
  dependencySizes: DependencySize[]
  description: string
  gzip: number
  hasJSModule: string
  hasJSNext: boolean
  hasSideEffects: string[]
  ignoredMissingDependencies: string[]
  isModuleType: boolean
  name: string
  peerDependencies: string[]
  repository: string
  scoped: boolean
  size: number
  version: string
}

export interface Asset {
  gzip: number
  name: string
  size: number
  type: string
}

export interface DependencySize {
  approximateSize: number
  name: string
}
