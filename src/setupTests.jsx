import { vi } from 'vitest';
import '@testing-library/jest-dom';
HTMLCanvasElement.prototype.getContext = (type) => {
  if (type === '2d') {
    return {
      fillRect: () => { },
      clearRect: () => { },
      getImageData: () => ({ data: [] }),
      putImageData: () => { },
      createImageData: () => [],
      setTransform: () => { },
      drawImage: () => { },
      save: () => { },
      fillText: () => { },
      restore: () => { },
      beginPath: () => { },
      moveTo: () => { },
      lineTo: () => { },
      closePath: () => { },
      stroke: () => { },
      translate: () => { },
      scale: () => { },
      rotate: () => { },
      arc: () => { },
      fill: () => { },
      measureText: () => ({ width: 0 }),
      transform: () => { },
      rect: () => { },
      clip: () => { },
      fillStyle: '',
      strokeStyle: '',
    };
  } else if (type === 'webgl' || type === 'experimental-webgl') {
    return {
      getExtension: () => { },
      enable: () => { },
      disable: () => { },
      clearColor: () => { },
      clearDepth: () => { },
      clearStencil: () => { },
      clear: () => { },
      createShader: () => ({}),
      shaderSource: () => { },
      compileShader: () => { },
      createProgram: () => ({}),
      attachShader: () => { },
      linkProgram: () => { },
      useProgram: () => { },
      getProgramParameter: () => true,
      getShaderParameter: () => true,
      createBuffer: () => ({}),
      bindBuffer: () => { },
      bufferData: () => { },
      viewport: () => { },
      drawArrays: () => { },
      drawElements: () => { },
      getUniformLocation: () => ({}),
      uniformMatrix4fv: () => { },
      uniform4fv: () => { },
      uniform1i: () => { },
      activeTexture: () => { },
      bindTexture: () => { },
      texParameteri: () => { },
      texImage2D: () => { },
      generateMipmap: () => { },
      createTexture: () => ({}),
    };
  }
  return null;
};

vi.mock('@react-three/fiber', () => {
  return {
    Canvas: ({ children }) => <div>{children}</div>,
    useFrame: vi.fn(), 
    useLoader: vi.fn(() => ({
      scene: {
        traverse: vi.fn(),
      },
      animations: [],
    })),
  };
});

vi.mock('@react-three/drei', () => {
  return {
    OrbitControls: () => null, 
    PerspectiveCamera: ({ children }) => <>{children}</>,
    FlyControls: vi.fn().mockImplementation(({ ref }) => <div ref={ref} />), 
  };
});

vi.mock('three', () => {
  const originalThree = vi.importActual('three');
  return {
    ...originalThree,
    AnimationMixer: vi.fn().mockReturnValue({
      clipAction: vi.fn().mockReturnValue({
        play: vi.fn(),
      }),
      update: vi.fn(),
    }),
    DoubleSide: 'DoubleSide',
  };
});