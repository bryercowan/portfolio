import React, { useEffect, useRef, useState } from 'react';

const ASCII_CHARS = ' .`\'^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

const getAsciiCharacter = (brightness: number): string => {
  const index = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
  return ASCII_CHARS[index];
};

export function VideoFeed({ videoUrl }: { videoUrl: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [asciiArt, setAsciiArt] = useState<string>('');

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const renderAscii = () => {
      if (!canvasRef.current || !videoRef.current) return;

      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      const width = 240; // ASCII "resolution" (columns)
      const height = 120; // ASCII "resolution" (rows)
      canvasRef.current.width = width;
      canvasRef.current.height = height;

      // Draw the video frame to the canvas (downscaling it)
      ctx.drawImage(videoRef.current, 0, 0, width, height);

      // Get pixel data
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;

      // Convert pixel data to ASCII
      let asciiFrame = '';
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const offset = (y * width + x) * 4; // RGBA
          const r = pixels[offset];
          const g = pixels[offset + 1];
          const b = pixels[offset + 2];

          // Calculate brightness
          const brightness = (r + g + b) / 3;
          asciiFrame += getAsciiCharacter(brightness);
        }
        asciiFrame += '\n'; // Newline for next row
      }

      setAsciiArt(asciiFrame);
      animationFrame = requestAnimationFrame(renderAscii);
    };

    renderAscii();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div style={{ fontFamily: 'monospace', whiteSpace: 'pre', lineHeight: '1em' }}>
      <video
        ref={videoRef}
        src={videoUrl}
        style={{ display: 'none' }}
        crossOrigin="anonymous"
        muted
        loop
        autoPlay
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <pre className="pre">{asciiArt}</pre>
    </div>
  );
}

