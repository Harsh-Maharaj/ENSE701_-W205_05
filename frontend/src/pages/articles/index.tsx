import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import data from "../../utils/dummydata";
import styles from "../../styles/Articles.module.scss"; // Import the styles

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
        className={styles.searchBar} // Apply search bar styles
        placeholder="Type to search by title, author or date..."
      />

      {/* Table container */}
      <div className={styles.tableContainer}>
        <SortableTable headers={headers} data={articles} />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async (_) => {
  // Map the data to ensure all articles have consistent property names
  const articles = data.map((article) => ({
    id: article.id ?? article._id,
    title: article.title,
    authors: article.authors,
    source: article.source,
    pubyear: article.pubyear,
    doi: article.doi,
    claim: article.claim,
    evidence: article.evidence,
  }));

  return {
    props: {
      articles,
    },
  };
};

export default Articles;
