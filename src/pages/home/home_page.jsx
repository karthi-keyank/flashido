import React from "react";
import "../../styles/pages/home_page.css";
import RandomQuote from "../../utils/RandomQuotes"; // adjust path accordingly
import HomeSetList from "./home_set_list";
import HomeFolderList from "./home_folder_list";
import HomePublicSetList from "./public_flashcards";

function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <RandomQuote />
      </section>
      <div className="recents">
        <HomeFolderList />
        <HomeSetList />
        <HomePublicSetList/>
      </div>
    </main>
  );
}

export default Home;
