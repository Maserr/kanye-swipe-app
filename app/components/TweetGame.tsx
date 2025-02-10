"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import Image from 'next/image';

interface Tweet {
  id: string;
  text: string;
  TRUE: boolean;
}

interface TweetCardProps extends Tweet {
  tweets: Tweet[];
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>;
  onSwipe: (isRight: boolean, isTrue: boolean) => void;
  index: number;
  motionX: MotionValue<number>;
}

const TweetGame = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const cardX = useMotionValue(0);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const tweetsRef = collection(db, "tweets");
        const q = query(tweetsRef);
        const tweetsSnapshot = await getDocs(q);
        
        if (tweetsSnapshot.empty) {
          setError("No tweets found. Please add some tweets to the database.");
          return;
        }

        const tweetsList = tweetsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Tweet));
        
        const shuffledTweets = [...tweetsList].sort(() => Math.random() - 0.5);
        setTweets(shuffledTweets);
      } catch (error) {
        console.error("Error fetching tweets:", error);
        setError("Failed to load tweets. Please check your database permissions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  const handleSwipe = (isRight: boolean, isTrue: boolean) => {
    if ((isRight && isTrue) || (!isRight && !isTrue)) {
      setScore(prev => prev + 1);
    }
  };

  const handleButtonClick = (isRight: boolean) => {
    if (tweets.length === 0) return;
    const currentTweet = tweets[tweets.length - 1];
    
    const targetX = isRight ? 200 : -200;
    
    animate(cardX, targetX, {
      type: "spring",
      stiffness: 100,
      damping: 30,
      duration: 1,
      onComplete: () => {
        setTweets((prev) => prev.filter((t) => t.id !== currentTweet.id));
        handleSwipe(isRight, currentTweet.TRUE);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="text-red-500 text-center">
          <p className="text-xl font-bold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full px-4 sm:px-0">
      <div className="text-xl font-bold">Score: {score}</div>
      <div className="flex flex-col justify-center items-center w-full gap-6">
        <div className="relative h-[450px] w-[280px] sm:h-[500px] sm:w-[425px]">
          {tweets.map((tweet, index) => (
            <TweetCard 
              key={tweet.id} 
              tweets={tweets} 
              setTweets={setTweets} 
              onSwipe={handleSwipe}
              index={index}
              motionX={cardX}
              {...tweet} 
            />
          ))}
        </div>
        <div className="flex justify-center gap-8 sm:gap-16">
          <button
            onClick={() => handleButtonClick(false)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 active:bg-red-700 transition-colors touch-manipulation"
            disabled={tweets.length === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={() => handleButtonClick(true)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 active:bg-green-700 transition-colors touch-manipulation"
            disabled={tweets.length === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const TweetCard = ({
  id,
  text,
  TRUE,
  tweets,
  setTweets,
  onSwipe,
  index,
  motionX,
}: TweetCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const background = useTransform(
    x,
    [-200, 0, 200],
    ["rgb(239, 68, 68)", "rgb(255, 255, 255)", "rgb(34, 197, 94)"]
  );

  const isTop = index === tweets.length - 1;
  const isSecond = index === tweets.length - 2;

  useEffect(() => {
    if (isTop) {
      const unsubscribe = motionX.onChange((latest) => {
        x.set(latest);
      });
      return () => unsubscribe();
    }
  }, [isTop, motionX, x]);

  const handleDragEnd = () => {
    const xVal = x.get();
    if (Math.abs(xVal) > 150) {
      animate(x, xVal < 0 ? -200 : 200, {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5,
        onComplete: () => {
          setTweets((prev) => prev.filter((t) => t.id !== id));
          onSwipe(xVal > 0, TRUE);
        }
      });
    } else {
      animate(x, 0, {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5
      });
    }
  };

  const generateRandomStats = () => {
    return {
      replies: Math.floor(Math.random() * 1000),
      reposts: Math.floor(Math.random() * 2000),
      likes: Math.floor(Math.random() * 10000),
      timestamp: new Date(
        Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
      ).toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full rounded-2xl p-4 shadow-lg cursor-grab active:cursor-grabbing bg-white touch-manipulation font-['Helvetica']"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity,
        background,
        zIndex: index,
        scale: isSecond ? 0.95 : 1,
        y: isSecond ? 10 : 0,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: isTop ? 1.02 : 1 }}
      animate={{ scale: isTop ? 1 : isSecond ? 0.95 : 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
            <Image 
              src="/ye-profile.jpg" 
              alt="Ye"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 40px, 40px"
              priority
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[15px] text-[#0F1419]">ye</span>
              <svg className="w-4 h-4 text-[#FFD700]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
              </svg>
              <span className="text-[#536471] text-[15px]">@kanyewest</span>
            </div>
          </div>
        </div>

        <div className="text-[17px] leading-normal text-[#0F1419] mb-3 font-['Helvetica']">
          {text}
        </div>

        <div className="mt-auto font-['Helvetica']">
          <div className="text-[#536471] text-[15px] mb-3">
            {generateRandomStats().timestamp}
          </div>
          <div className="border-t border-[#EFF3F4] pt-3">
            <div className="flex gap-5 text-[#536471] text-[13px]">
              <span>{generateRandomStats().replies.toLocaleString()} Replies</span>
              <span>{generateRandomStats().reposts.toLocaleString()} Reposts</span>
              <span>{generateRandomStats().likes.toLocaleString()} Likes</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4 text-center">
          Swipe right if you think it&apos;s real, left if fake
        </div>
      </div>
    </motion.div>
  );
};

export default TweetGame; 