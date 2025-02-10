"use client";

import TweetGame from "@/app/components/TweetGame";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
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
      <main className="w-full max-w-4xl flex flex-col items-center justify-center relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-white">Kanye Tweet Game</h1>
        <TweetGame />
      </main>
    </div>
  );
}






