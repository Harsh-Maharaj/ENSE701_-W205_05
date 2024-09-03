import { GetStaticProps, NextPage } from "next";
import axios from "axios";
import SortableTable from "../../components/table/SortableTable";

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string | null;  // Allow null values
  evidence: string;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
  ];

  return (
    <div className="container">
      <h1>Articles</h1>
      <p>Welcome to the SPEED database</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/articles");
    const articles = response.data.map((article: any) => ({
      id: article._id,
      title: article.title,
      authors: article.authors.join(", "),
      source: article.source,
      pubyear: article.publication_year,
      doi: article.doi,
      claim: article.claim ?? null, 
      evidence: article.evidence ?? null, 
    }));

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        articles: [], // Return an empty array if there's an error
      },
    };
  }
};

export default Articles;
