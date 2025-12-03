export function computeSmartCameraTarget(
    [x, y, z]: [number, number, number],
    distance = 2.5
  ) {
    const height = y + 0.5;
  
    // Determine direction camera should offset
    let offsetX = 0;
    let offsetZ = 0;
  
    // If object is on the right → move camera left
    if (x > 0.5) {
      offsetX = -1.2;
      offsetZ = 1.2;
    }
  
    // If object is on the left → move camera right
    else if (x < -0.5) {
      offsetX = 1.2;
      offsetZ = 1.2;
    }
  
    // If object is centered (Experience)
    else {
      offsetX = 1.0;    // small angle
      offsetZ = 1.5;    // stay in front
    }
  
    return [
      x + offsetX,
      height,
      z + offsetZ,
    ] as [number, number, number];
  }
  