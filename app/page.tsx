import TweetGame from "@/app/components/TweetGame";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black">
      <main className="w-full max-w-4xl flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8 text-white">Kanye Tweet Game</h1>
        <TweetGame />
      </main>
    </div>
  );
}
