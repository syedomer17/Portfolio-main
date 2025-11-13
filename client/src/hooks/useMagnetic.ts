import { useRef } from "react";

export default function useMagnetic(strength = 50) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = `translate(0px,0px)`;
  };

  return { ref, handleMouseMove, handleMouseLeave };
}
