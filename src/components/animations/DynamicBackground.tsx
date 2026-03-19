'use client';

export function DynamicBackground({ className = '' }: { className?: string; intensity?: 'low' | 'medium' | 'high' }) {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}>
      {/* Base gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, hsla(258,89%,66%,0.10) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 100% 100%, hsla(217,91%,60%,0.07) 0%, transparent 55%)',
        }}
      />
      {/* Soft violet orb — top right */}
      <div
        className="absolute top-[5%] right-[8%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsla(258,89%,66%,0.14) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Soft blue orb — bottom left */}
      <div
        className="absolute bottom-[10%] left-[5%] w-[420px] h-[420px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsla(217,91%,60%,0.10) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />
      {/* Subtle cyan orb — center */}
      <div
        className="absolute top-[45%] left-[40%] w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsla(189,95%,48%,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
    </div>
  );
}

export default DynamicBackground;
