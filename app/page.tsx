"use client";

import TweetGame from "@/app/components/TweetGame";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start pt-12 sm:justify-center relative overflow-hidden">
      {/* Background container */}
      <div className="absolute inset-0 flex">
        {/* Left side */}
        <div className="w-1/2 relative">
          <Image
            src="/fallback-leftt.jpg"
            alt="Kanye smiling"
            fill
            className="object-cover"
            priority
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        {/* Right side - flipped image */}
        <div className="w-1/2 relative">
          <Image
            src="/kanye-smile.jpg"
            alt="Kanye smiling"
            fill
            className="object-cover scale-x-[-1]"
            priority
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      {/* Content */}
      <main className="w-full max-w-4xl flex flex-col items-center relative z-10">
        <div className="text-center mb-4 sm:mb-6 px-4">
          <div className="flex flex-col items-center gap-1">
            <div 
              onClick={(event) => {
                navigator.clipboard.writeText('123');
                const target = (event.currentTarget as HTMLElement);
                target.classList.add('scale-105');
                setTimeout(() => target.classList.remove('scale-105'), 200);
              }}
              className="group relative px-3 sm:px-6 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/20 w-full max-w-[300px] sm:max-w-none overflow-hidden"
            >
              <div className="flex items-center gap-2 justify-center">
                <span className="text-lg sm:text-xl font-mono text-yellow-400">CA:</span>
                <span className="text-sm sm:text-lg font-medium text-white font-mono truncate">
                  123
                </span>
              </div>
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                Click to copy
              </span>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/60 block sm:hidden">
                Tap to copy
              </span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white font-['Helvetica'] mt-4 sm:mt-6">YE OR NEY</h1>
          <p className="text-base sm:text-lg text-white font-['Helvetica'] mt-2">Kanye West or AI? Swipe to find out!</p>
        </div>
        <TweetGame />
      </main>
    </div>
  );
}






