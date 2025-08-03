import React from "react";
import "../../styles/pages/home_page.css";
import RandomQuote from "../../utils/RandomQuotes"; // adjust path accordingly

function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <RandomQuote />
      </section>
    </main>
  );
}

export default Home;
