import Head from "next/head";
import { Inter } from "@next/font/google";
import Header from "../components/header";
import IngredientList from "../components/ingredient-list";
import Footer from "../components/footer";
import Calories from "../components/calories";
import Specifications from "../components/specifications";
import RequestButton from "../components/request-button";
import Recipe from "../components/recipe";

const inter = Inter({ subsets: ["latin"] });
const api_key = "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";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Chef</title>
        <meta name="description" content="Recipe generator by AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <IngredientList />
          <Calories />
          <Specifications />
          <RequestButton />
          <Recipe />
        </div>
        <Footer />
      </main>
    </>
  );
}
