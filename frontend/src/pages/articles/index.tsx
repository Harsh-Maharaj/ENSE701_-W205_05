import { GetServerSideProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import styles from "../../styles/Articles.module.scss";

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string;
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
    <div className={styles.container}>
      <h1>All Published Articles</h1>

      {/* Search bar */}
      <input
        type="text"
        className={styles.searchBar}
        placeholder="Type to search by title, author or date..."
      />

      {/* Table container */}
      <div className={styles.tableContainer}>
        <SortableTable headers={headers} data={articles} />
      </div>
    </div>
  );
};

// Fetch articles from the API and pass them as props
export const getServerSideProps: GetServerSideProps<ArticlesProps> = async () => {
  const res = await fetch('http://localhost:5000/api/articles'); // Adjust if needed
  const articles = await res.json();

  return {
    props: {
      articles: articles.map((article: any) => ({
        id: article._id, // MongoDB returns _id, so map it to id
        title: article.title,
        authors: article.authors.join(", "), // Assuming authors is an array
        source: article.source,
        pubyear: article.publication_year, // Adjust if needed
        doi: article.doi,
        claim: article.claim,
        evidence: article.evidence,
      })),
    },
  };
};

export default Articles;
