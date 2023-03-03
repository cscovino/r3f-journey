import { Material, Mesh } from 'three';

declare module 'three/examples/jsm/loaders/GLTFLoader' {
  export interface GLTF {
    nodes: { [key: string]: Mesh };
    materials: { [key: string]: Material };
  }
}
