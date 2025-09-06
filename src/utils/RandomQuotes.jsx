import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";

function RandomQuote() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);
  const lastIndexRef = useRef(null);

  useEffect(() => {
    const cachedQuote = localStorage.getItem("randomQuote");

    if (cachedQuote) {
      setQuote(cachedQuote);
      setLoading(false); // show instantly from cache
    }

    const fetchQuotes = async () => {
      try {
        const docRef = doc(db, "quotes", "q1");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const quotes = data.quotes;

          if (Array.isArray(quotes) && quotes.length > 0) {
            let randomIndex;
            do {
              randomIndex = Math.floor(Math.random() * quotes.length);
            } while (randomIndex === lastIndexRef.current && quotes.length > 1);

            lastIndexRef.current = randomIndex;
            const newQuote = quotes[randomIndex];
            setQuote(newQuote);
            localStorage.setItem("randomQuote", newQuote); // save for next time
          }
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
        if (!quote) setQuote("Error loading quote.");
      } finally {
        setLoading(false);
      }
    };

    // if no cache, then load
    if (!cachedQuote) {
      fetchQuotes();
    } else {
      // still refresh in background for next visit
      fetchQuotes();
    }
  }, []);

  return (
    <div className="home-quote">
      {loading ? <ClipLoader color="#4A90E2" size={35} /> : <p>{quote}</p>}
    </div>
  );
}

export default RandomQuote;
