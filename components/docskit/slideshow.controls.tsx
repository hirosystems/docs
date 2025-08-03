'use client';

import { useSelectedIndex } from 'codehike/utils/selection';

export function Controls({ length }: { length: number }) {
  const [selectedIndex, setSelectedIndex] = useSelectedIndex();

  return (
    <div className="flex justify-center items-center">
      <button
        className="mr-4 cursor-pointer"
        onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
      >
        Prev
      </button>
      {[...Array(length)].map((_, i) => (
        <button
          key={i}
          className={`w-2 h-2 rounded-full mx-1 cursor-pointer ${
            selectedIndex === i ? 'bg-hiro' : 'bg-border'
          } transition-colors duration-300`}
          onClick={() => setSelectedIndex(i)}
        />
      ))}
      <button
        className="ml-4 cursor-pointer"
        onClick={() => setSelectedIndex(Math.min(length - 1, selectedIndex + 1))}
      >
        Next
      </button>
    </div>
  );
}
