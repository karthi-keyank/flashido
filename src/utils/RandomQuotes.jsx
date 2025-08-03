import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";

function RandomQuote() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);
  const lastIndexRef = useRef(null); // store last index to avoid repeat

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const docRef = doc(db, "quotes", "q1");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const quotes = data.quotes;

          if (Array.isArray(quotes) && quotes.length > 0) {
            let randomIndex;

            // Ensure the same quote is not picked consecutively
            do {
              randomIndex = Math.floor(Math.random() * quotes.length);
            } while (randomIndex === lastIndexRef.current && quotes.length > 1);

            lastIndexRef.current = randomIndex;
            setQuote(quotes[randomIndex]);
          } else {
            setQuote("No quotes available.");
          }
        } else {
          setQuote("Quotes not found.");
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote("Error loading quote.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="home-quote">
      {loading ? <ClipLoader color="#4A90E2" size={35} /> : <p>{quote}</p>}
    </div>
  );
}

export default RandomQuote;
