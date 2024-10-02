import { FormEvent, useState } from "react";
import axios from "axios";
import formStyles from "../../styles/Forms.module.scss";

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://ense701-g6.vercel.app/api'
  : 'http://localhost:8000/api';

const NewDiscussion = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [pubYear, setPubYear] = useState<number | string>("");
  const [journal, setJournal] = useState("");
  const [sePractice, setSePractice] = useState("");
  const [claim, setClaim] = useState("");
  const [researchType, setResearchType] = useState("");
  const [doi, setDoi] = useState("");
  const [summary, setSummary] = useState("");
  const [volume, setVolume] = useState("");
  const [number, setNumber] = useState("");
  const [pages, setPages] = useState("");

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const articleData = {
        title,
        authors,
        publication_year: pubYear,
        journal,
        se_practice: sePractice,
        claim,
        research_type: researchType,
        doi,
        summary,
        volume,
        number,
        pages,
      };

      console.log("Submitting article with data:", articleData);
      const response = await axios.post(`${API_URL}/articles`, articleData);

      if (response.status === 201) {
        alert("Article submitted successfully!");
        // Clear the form after successful submission
        setTitle("");
        setAuthors([]);
        setPubYear("");
        setJournal("");
        setSePractice("");
        setClaim("");
        setResearchType("");
        setDoi("");
        setSummary("");
        setVolume("");
        setNumber("");
        setPages("");
      }
    } catch (error) {
      console.error("Error submitting article:", error);
      alert("Failed to submit the article. Please try again.");
    }
  };

  const addAuthor = () => setAuthors([...authors, ""]);
  const removeAuthor = (index: number) => setAuthors(authors.filter((_, i) => i !== index));
  const updateAuthor = (index: number, value: string) => {
    setAuthors(authors.map((author, i) => (i === index ? value : author)));
  };

  return (
    <div className={formStyles.container}>
      <h1 className={formStyles.header}>Submit a New Article</h1>
      <form className={formStyles.form} onSubmit={submitNewArticle}>
        <div className={formStyles.field}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the article title"
            required
          />
        </div>

        <div className={formStyles.field}>
          <label>Authors</label>
          {authors.map((author, index) => (
            <div key={index} className={formStyles.authorField}>
              <input
                type="text"
                value={author}
                onChange={(e) => updateAuthor(index, e.target.value)}
                placeholder={`Author ${index + 1}`}
                required
                className={formStyles.input}
              />
              <button type="button" onClick={() => removeAuthor(index)} className={formStyles.removeButton}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addAuthor} className={formStyles.addButton}>
            Add Author
          </button>
        </div>

        <div className={formStyles.field}>
          <label htmlFor="pubYear">Year of Publication</label>
          <input
            type="number"
            id="pubYear"
            value={pubYear}
            onChange={(e) => setPubYear(e.target.value)}
            placeholder="e.g., 2021"
            required
            className={formStyles.input}
          />
        </div>

        <div className={formStyles.field}>
          <label htmlFor="journal">Journal/Conference Name</label>
          <input
            type="text"
            id="journal"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="Enter the journal or conference name"
            required
            className={formStyles.input}
          />
        </div>

        <div className={formStyles.inlineGroup}>
          <div className={formStyles.inlineItem}>
            <label htmlFor="volume">Volume</label>
            <input
              type="text"
              id="volume"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="e.g., 34"
              className={`${formStyles.input} ${formStyles.shortTextField}`}
            />
          </div>
          <div className={formStyles.inlineItem}>
            <label htmlFor="number">Number</label>
            <input
              type="text"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="e.g., 2"
              className={`${formStyles.input} ${formStyles.shortTextField}`}
            />
          </div>
          <div className={formStyles.inlineItem}>
            <label htmlFor="pages">Pages</label>
            <input
              type="text"
              id="pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="e.g., 123-145"
              className={`${formStyles.input} ${formStyles.shortTextField}`}
            />
          </div>
        </div>

        <div className={formStyles.field}>
          <label htmlFor="doi">DOI</label>
          <input
            type="text"
            id="doi"
            value={doi}
            onChange={(e) => setDoi(e.target.value)}
            placeholder="Enter the DOI"
            className={formStyles.input}
          />
        </div>

        <div className={formStyles.field}>
          <label htmlFor="sePractice">SE Practice</label>
          <input
            type="text"
            id="sePractice"
            value={sePractice}
            onChange={(e) => setSePractice(e.target.value)}
            placeholder="e.g., Test-Driven Development"
            required
            className={formStyles.input}
          />
        </div>

        <div className={formStyles.field}>
          <label htmlFor="claim">Claim</label>
          <textarea
            id="claim"
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder="State the claim made in the article"
            required
            className={`${formStyles.input} ${formStyles.longTextField}`}
          />
        </div>

        <div className={formStyles.field}>
          <label htmlFor="researchType">Type of Research</label>
          <select
            id="researchType"
            value={researchType}
            onChange={(e) => setResearchType(e.target.value)}
            required
            className={formStyles.input}
          >
            <option value="">Select a research type</option>
            <option value="case study">Case Study</option>
            <option value="experiment">Experiment</option>
            <option value="survey">Survey</option>
            <option value="literature review">Literature Review</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={formStyles.field}>
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Provide a brief summary of the article"
            required
            className={`${formStyles.input} ${formStyles.longTextField}`}
          />
        </div>

        <button type="submit" className={formStyles.submitButton}>
          Submit Article
        </button>
      </form>
    </div>
  );
};

export default NewDiscussion;
