import React, { useEffect, useRef } from "react";
import "@css/background.scss";

export const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height;
    let tick = 0;

    // Mouse and scroll state
    const cursor = { x: 0, y: 0 };
    let scrollY = window.scrollY;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    handleResize();

    // Configuration for curves
    const lines = 12; // Number of topographic lines
    const baseAmplitude = 30;
    const separation = 80;
    const speed = 0.002;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      // Base vertical shift based on scroll
      const scrollOffset = scrollY * 0.2;

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();

        // Vary color slightly for each line to give depth
        const hue = 220 + i * 5; // Blue to purple range
        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, 0.15)`;
        ctx.lineWidth = 1;

        // Draw curve across width
        for (let x = 0; x <= width; x += 20) {
          // Complex sine summation for "terrain" look
          // Influence by mouse
          const dx = x - cursor.x;
          const dy = (height / lines) * i - cursor.y; // approximate y pos of line
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseInteraction = Math.max(0, 1000 - dist) / 20; // Bulge near mouse

          const y =
            (height / lines) * i + // Base position
            Math.sin(x * 0.005 + tick * speed + i) * baseAmplitude + // Large wave
            Math.sin(x * 0.02 + tick * speed * 2) * (baseAmplitude / 2) + // Detail wave
            scrollOffset * ((i % 2 === 0 ? 1 : -1) * 0.1) + // Parallax scroll effect
            mouseInteraction * Math.sin(x * 0.01); // Mouse distortion

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-background-canvas" />;
};
