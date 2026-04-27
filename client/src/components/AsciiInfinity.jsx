import React, { useEffect, useRef } from 'react';
import './AsciiInfinity.css';

const AsciiInfinity = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const chars = ' .:*+x=oO#∞'.split('');
    const width = 80;
    const height = 40;
    let frame = 0;
    
    // Mouse tracking for parallax/rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      // Normalize mouse coordinates from -1 to 1
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const renderFrame = () => {
      if (!textRef.current) return;

      // Smooth interpolation for mouse movement
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      const buffer = new Array(width * height).fill(' ');
      const zBuffer = new Array(width * height).fill(0);

      const time = frame * 0.02;

      // Draw the lemniscate (infinity loop)
      for (let t = 0; t < Math.PI * 2; t += 0.02) {
        // Parametric equations for 3D infinity loop
        const a = 6; // Reduced for smaller size
        // Base coordinates
        let x = (a * Math.cos(t)) / (1 + Math.sin(t) ** 2);
        let y = (a * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) ** 2);
        let z = Math.sin(t * 2 + time) * 3; // Reduced depth for smaller scale

        // Apply rotation based on mouse
        // Rotate around Y axis
        const rotY = targetX * Math.PI * 0.3; // Less extreme rotation
        const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
        const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
        x = x1;
        z = z1;

        // Rotate around X axis
        const rotX = targetY * Math.PI * 0.3;
        const y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
        const z2 = y * Math.sin(rotX) + z * Math.cos(rotX);
        y = y1;
        z = z2;

        // Perspective projection
        const distance = 20;
        const zProj = distance / (distance - z);
        
        // Scale and translate to grid
        const scaleX = 2.0; // Adjusted for smaller loop
        const scaleY = 1.0;
        
        const px = Math.floor(x * zProj * scaleX + width / 2);
        const py = Math.floor(y * zProj * scaleY + height / 2);

        if (px >= 0 && px < width && py >= 0 && py < height) {
          const idx = py * width + px;
          // Calculate character based on depth
          const depthIdx = Math.floor(((z + 5) / 10) * (chars.length - 1));
          const charIdx = Math.max(0, Math.min(chars.length - 1, depthIdx));
          
          if (z > zBuffer[idx] || buffer[idx] === ' ') {
            buffer[idx] = chars[charIdx];
            zBuffer[idx] = z;
          }
        }
      }

      // Convert buffer to text string with newlines
      let result = '';
      for (let i = 0; i < height; i++) {
        result += buffer.slice(i * width, (i + 1) * width).join('') + '\n';
      }

      textRef.current.textContent = result;
      frame++;
      requestAnimationFrame(renderFrame);
    };

    const animId = requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="ascii-container" ref={containerRef}>
      <pre className="ascii-text" ref={textRef}></pre>
    </div>
  );
};

export default AsciiInfinity;
