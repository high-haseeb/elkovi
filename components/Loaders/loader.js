import * as THREE from 'three'
import {  GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'

function onBufferLoad(buffer) {
  let schematicJsonSize = new Uint32Array(buffer, 0, 1)[0];
  let schematic = JSON.parse(
    String.fromCharCode.apply(
      null,
      new Uint8Array(buffer, 4, schematicJsonSize),
    ),
  );

  let vertexCount = schematic.vertexCount;
  let indexCount = schematic.indexCount;
  let offset = 4 + schematicJsonSize;

  let geometry = new THREE.BufferGeometry();
  let schematicAttributeList = schematic.attributes;
  let hasNormal = false;
  let offsetMap = {};

  for (let i = 0, len = schematicAttributeList.length; i < len; i++) {
    let schematicAttribute = schematicAttributeList[i];
    let id = schematicAttribute.id;
    let dataLength = id === "indices" ? indexCount : vertexCount;
    let componentSize = schematicAttribute.componentSize;
    let storageType = window[schematicAttribute.storageType];
    let tmpArr = new storageType(buffer, offset, dataLength * componentSize);
    let byteSize = storageType.BYTES_PER_ELEMENT;
    let outArr;
    if (schematicAttribute.needsPack) {
      let packedComponents = schematicAttribute.packedComponents;
      let packedComponentCount = packedComponents.length;
      let isSign = schematicAttribute.storageType.indexOf("Int") === 0;
      let size = 1 << (byteSize * 8);
      let offset = isSign ? size * 0.5 : 0;
      let divider = 1 / size;
      outArr = new Float32Array(dataLength * componentSize);
      for (let j = 0, jk = 0; j < dataLength; j++) {
        for (let k = 0; k < packedComponentCount; k++) {
          let packedComponent = packedComponents[k];
          outArr[jk] =
            (tmpArr[jk] + offset) * divider * packedComponent.delta +
            packedComponent.from;
          jk++;
        }
      }
    } else {
      offsetMap[id] = offset;
      outArr = tmpArr;
    }

    if (id === "normal") hasNormal = true;

    if (id === "indices") {
      geometry.setIndex(new THREE.BufferAttribute(outArr, 1));
    } else {
      geometry.setAttribute(
        id,
        new THREE.BufferAttribute(outArr, componentSize),
      );
    }

    offset += dataLength * componentSize * byteSize;
  }

  let meshType = schematic.meshType;

  let material;
  let mesh;
  if (meshType === "Mesh") {
    // material = new THREE.MeshNormalMaterial({ flatShading: !hasNormal });
    material = new THREE.MeshStandardMaterial({ color: '#181818' });
    mesh = new THREE.Mesh(geometry, material);
  } else if (meshType === "LineSegments") {
    material = new THREE.LineBasicMaterial({color: '#181818' });
    mesh = new THREE.LineSegments(geometry, material);
  } else {
    material = new THREE.PointsMaterial({
      sizeAttenuation: false,
      size: 2,
    });
    mesh = new THREE.Points(geometry, material);
  }
  return mesh;
}
export const fetchData = async (
  path,
  onProgress = (percentage) => {
    console.log(`${percentage}%`);
  },
) => {
  const response = await fetch(path);

  const reader = response.body.getReader();
  const contentLength = +response.headers.get("Content-Length");

  let receivedLength = 0; // received that many bytes at the moment
  let percentage = 0;
  let chunks = []; // array of received binary chunks (comprises the body)

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    chunks.push(value);
    receivedLength += value.length;
    percentage = (receivedLength / contentLength) * 100;

    onProgress(percentage);
  }

  let chunksAll = new Uint8Array(receivedLength); // (4.1)
  let position = 0;
  for (let chunk of chunks) {
    chunksAll.set(chunk, position); // (4.2)
    position += chunk.length;
  }

  const mesh = onBufferLoad(chunksAll.buffer);
  return mesh;
};
export const exportToGLTF = (mesh) => {
  const exporter = new GLTFExporter();
  exporter.parse(mesh, (result) => {
    const blob = new Blob([JSON.stringify(result)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'exportedModel.gltf';
    link.click();
  }, {});
};
