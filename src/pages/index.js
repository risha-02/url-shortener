import { useState } from "react";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl }),
    });
    const data = await res.json();
    if (data.shortUrl) setShortUrl(`https://${data.shortUrl}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
      <h1 className="text-4xl font-bold mb-6 text-white">URL Shortener</h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter your long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="p-3 rounded-lg w-96"
        />
        <button
          onClick={handleShorten}
          className="bg-white text-purple-500 px-5 rounded-lg font-bold hover:bg-purple-100 transition"
        >
          Shorten
        </button>
      </div>

      {shortUrl && (
        <p className="mt-6 text-white text-lg">
          Short URL:{" "}
          <a href={shortUrl} target="_blank" className="underline">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
