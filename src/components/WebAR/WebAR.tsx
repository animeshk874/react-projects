import "@google/model-viewer/dist/model-viewer";

export function WebAR() {
  return (
    <div style={{
      height: '95vh',
      width: '95%',
      aspectRatio: 9/16,
      margin: 'auto',
    }}>
      <model-viewer 
        alt="Astronaut in 3D" 
        ar 
        src="/astronaut.glb" 
        shadow-intensity="1" 
        camera-controls 
        style={{
          width: '100%',
          height: '100%',
        }}
        touch-action="pan-y">
      </model-viewer>
    </div>
  );
}