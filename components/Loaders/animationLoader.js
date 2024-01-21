import * as THREE from 'three';

function loadBuffer(url) {
  return fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => onBufferLoad(buffer));
}

function onBufferLoad(buffer) {
  const schematicJsonSize = new Uint32Array(buffer, 0, 1)[0];
  const schematic = JSON.parse(
    String.fromCharCode.apply(
      null,
      new Uint8Array(buffer, 4, schematicJsonSize),
    ),
  );

  // Check if animation attributes are present
  const animationAttributes = schematic.attributes.filter(attribute => attribute.needsPack);
  
  if (animationAttributes.length > 0) {
    const mixer = loadAnimationFromBuffer(buffer, animationAttributes);
    // You can now use the mixer to control the animations
    return { mixer };
  } else {
    console.warn("No animation attributes found in the schematic.");
    return null;
  }
}

function loadAnimationFromBuffer(buffer, animationAttributes) {
  const mixer = new THREE.AnimationMixer();

  animationAttributes.forEach(attribute => {
    const animationClip = createAnimationClip(attribute, buffer);
    const action = mixer.clipAction(animationClip);
    action.play();
  });

  return mixer;
}



function createAnimationClip(attribute, buffer) {
  const { id, packedComponents } = attribute;
  const numKeyframes = packedComponents.length;

  // Create Float32Array view on the ArrayBuffer for the attribute
  const dataView = new Float32Array(buffer, attribute.offset, numKeyframes * attribute.componentSize);

  // Construct keyframes from the binary data
  const keyframes = [];

  for (let i = 0; i < numKeyframes; i++) {
    const frameData = {};
    for (let j = 0; j < attribute.componentSize; j++) {
      frameData[`${id}_${j}`] = dataView[i * attribute.componentSize + j];
    }
    keyframes.push(frameData);
  }

  // Create a single property track for each component
  const tracks = [];

  for (let j = 0; j < attribute.componentSize; j++) {
    const trackName = `${id}_${j}`;
    const track = new THREE.NumberKeyframeTrack(trackName, [0, numKeyframes - 1], keyframes.map(frame => frame[trackName]));
    tracks.push(track);
  }

  // Create AnimationClip from tracks
  const animationClip = new THREE.AnimationClip(id, undefined, tracks);

  return animationClip;
}



export { loadBuffer as loadAnimationBuffer };
