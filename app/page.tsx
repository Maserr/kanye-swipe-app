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
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-white font-['Helvetica']">YE OR NEY</h1>
          <p className="text-lg text-white font-['Helvetica'] mt-2">Kanye West or AI? Swipe to find out!</p>
        </div>
        <TweetGame />
      </main>
    </div>
  );
}






