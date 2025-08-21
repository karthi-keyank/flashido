import React from "react";
import "../../styles/pages/home_page.css";
import RandomQuote from "../../utils/RandomQuotes"; // adjust path accordingly
import FolderListHorizontal from "./home_folder_list";

function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <RandomQuote />
      </section>
      <FolderListHorizontal/>
    </main>
  );
}

export default Home;
