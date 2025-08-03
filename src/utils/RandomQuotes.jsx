import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // adjust the path if needed
import { doc, getDoc } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader"; // Spinner import

function RandomQuote() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const docRef = doc(db, "quotes", "q1");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const quotes = data.quotes;
          if (Array.isArray(quotes) && quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
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
        setLoading(false); // loading complete
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
