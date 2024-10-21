import React, { FormEvent, useState } from "react";
import bibtexParse from "bibtex-parse-js"; // Import the BibTeX parser
import formStyles from '../../styles/Form.module.scss';
import axios from 'axios';

const NewDiscussion = () => {
  // State for form fields
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [source, setSource] = useState("");
  const [pubyear, setPubyear] = useState<number | undefined>();
  const [doi, setDoi] = useState("");
  const [claim, setClaim] = useState("");
  const [evidence, setEvidence] = useState("");

  const [showDoiInput, setShowDoiInput] = useState(false);

  // State for validation errors
  const [errors, setErrors] = useState({
    title: false,
    authors: false,
    source: false,
    pubyear: false,
    doi: false,
    claim: false,
    evidence: false,
  });

  // Handle BibTeX file upload
  const handleBibtexUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        try {
          // Parse BibTeX content
          const parsedEntries = bibtexParse.toJSON(fileContent);
          if (parsedEntries.length > 0) {
            const entry = parsedEntries[0]; // Assuming you are handling one BibTeX entry
            setTitle(entry.entryTags?.title || "");
            setAuthors(entry.entryTags?.author || "");
            setSource(entry.entryTags?.journal || entry.entryTags?.booktitle || "");
            setPubyear(parseInt(entry.entryTags?.year || "0") || undefined);
            setDoi(entry.entryTags?.doi || "");
            setClaim(entry.entryTags?.claim || ""); // Set claim if relevant or leave empty
            setEvidence(entry.entryTags?.evidence ||""); // Set evidence if relevant or leave empty
          } else {
            alert("No valid BibTeX entries found.");
          }
        } catch (error) {
          console.error("Error parsing BibTeX:", error);
          alert("Failed to parse BibTeX file.");
        }
      };
      reader.readAsText(file);
    }
  };

  // Function to fetch metadata from DOI
  const fetchMetadataFromDOI = async () => {
    try {
      const response = await fetch(`https://api.crossref.org/works/${doi}`);
      const data = await response.json();

      if (data.message) {
        const article = data.message;
        setTitle(article.title ? article.title[0] : "");
        setAuthors(article.author ? article.author.map((a: any) => `${a.given} ${a.family}`).join(", ") : "");
        setSource(article['container-title'] ? article['container-title'][0] : "");
        setPubyear(article.published ? article.published['date-parts'][0][0] : undefined);
        setClaim(article.claim ? article.claim[0] : "");
        setEvidence(article.evidence ? article.evidence[0] : "");
      } else {
        alert("No data found for this DOI");
      }
    } catch (error) {
      console.error("Error fetching DOI metadata:", error);
      alert("Failed to fetch metadata for DOI");
    }
  };

  // Handle form submission
  const submitNewArticle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation checks
    const newErrors = {
      title: !title,
      authors: !authors,
      source: !source,
      pubyear: !pubyear,
      doi: !doi,
      claim: !claim,
      evidence: !evidence,
    };

    // If there are any errors, show error messages in the input fields
    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      title,
      authors: authors.split(',').map(author => author.trim()),
      source,
      pubyear,
      doi,
      claim,
      evidence,
    };

    try {
      // Use the environment variable for the backend API URL
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      await axios.post(`${apiUrl}/api/articles`, formData);
      // Show success alert
      alert('Article submitted successfully!');
    } catch (error) {
      console.error('Error creating article:', error);
      // Show error alert
      alert('Failed to submit article. Please try again.');
    }
  };


  return (
    <div className={formStyles.formContainer}>
      <h2>Submit a New Article</h2>
      <form onSubmit={submitNewArticle} className={formStyles.form}>
        {/* BibTeX Upload */}
        <div className={formStyles.bibtexContainer}>
          <label htmlFor="bibtexFile">Upload BibTeX File:</label>
          <input className={formStyles.bibtexInput}
            type="file"
            name="bibtexFile"
            id="bibtexFile"
            accept=".bib"
            onChange={handleBibtexUpload}
          />
        </div>

        {/* Toggle DOI Input */}
        <button
          type="button"
          className={formStyles.doiButton}
          onClick={() => setShowDoiInput(!showDoiInput)}
        >
          {showDoiInput ? "Hide" : "Fetch from DOI"}
        </button>

        {/* DOI Input and Fetch Button */}
        {showDoiInput && (
          <>
            <label htmlFor="doi">DOI:</label>
            <input
              className={formStyles.formItem}
              type="text"
              name="doi"
              id="doi"
              value={doi}
              onChange={(event) => setDoi(event.target.value)}
            />
            <button
              type="button"
              className={formStyles.formItem}
              onClick={fetchMetadataFromDOI}
            >
              Fetch from DOI
            </button>
          </>
        )}

        {/* form fields */}
        <label htmlFor="title">Title:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="title"
          id="title"
          value={title}
          placeholder={errors.title ? "Title is required" : ""}
          onChange={(event) => {
            setTitle(event.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, title: false }));
          }}
        />

        <label htmlFor="authors">Authors:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="authors"
          id="authors"
          value={authors}
          placeholder={errors.authors ? "Authors are required" : ""}
          onChange={(event) => {
            setAuthors(event.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, authors: false }));
          }}
        />

        <label htmlFor="source">Source:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="source"
          id="source"
          value={source}
          placeholder={errors.source ? "Source is required" : ""}
          onChange={(event) => {
            setSource(event.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, source: false }));
          }}
        />

        <label htmlFor="pubyear">Publication Year:</label>
        <input
          className={formStyles.formItem}
          type="number"
          name="pubyear"
          id="pubyear"
          value={pubyear || ""}
          placeholder={errors.pubyear ? "Publication year is required" : ""}
          onChange={(event) => {
            setPubyear(parseInt(event.target.value));
            setErrors((prevErrors) => ({ ...prevErrors, pubyear: false }));
          }}
        />

        <label htmlFor="doi">DOI:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="doi"
          id="doi"
          value={doi}
          placeholder={errors.doi ? "DOI is required" : ""}
          onChange={(event) => {
            setDoi(event.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, doi: false }));
          }}
        />

        <label htmlFor="claim">Claim:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="claim"
          id="claim"
          value={claim}
          placeholder={errors.claim ? "Claim is required" : ""}
          onChange={(event) => {
            setClaim(event.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, claim: false }));
          }}
        />

        <label htmlFor="evidence">Evidence:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="evidence"
          id="evidence"
          value={evidence}
          placeholder={errors.evidence ? "Evidence is required" : ""}
          onChange={(event) => {
            setEvidence(event.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, evidence: false }));
          }}
        />

        <button className={formStyles.formItem} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewDiscussion;
