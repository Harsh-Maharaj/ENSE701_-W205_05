import { FormEvent, useState } from "react";
import formStyles from "../../styles/Form.module.scss";

const NewDiscussion = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [claim, setClaim] = useState("");
  const [evidence, setEvidence] = useState("");
  const [linkedDiscussion, setLinkedDiscussion] = useState("");

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const res = await fetch('http://localhost:5000/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          authors,
          source,
          publication_year: pubYear,
          doi,
          claim,
          evidence,
          linked_discussion: linkedDiscussion,
        }),
      });
  
      if (!res.ok) {
        const contentType = res.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const errorResponse = await res.json();
          console.error('Error response from backend:', errorResponse);
          alert(`Error: ${errorResponse.message}`);
        } else {
          console.error('Received HTML response instead of JSON:', await res.text());
          alert('Server error, received an unexpected HTML response.');
        }
      } else {
        const data = await res.json();
        console.log('Article submitted:', data);
        alert('Article submitted successfully!');  // Show success message
        // Clear form
        setTitle('');
        setAuthors([]);
        setSource('');
        setPubYear(0);
        setDoi('');
        setClaim('');
        setEvidence('');
        setLinkedDiscussion('');
        // setBibtex('');
      }
    } catch (error) {
      console.error('Error submitting article:', error);
    }
  };
  
  

  // Some helper methods for the authors array

  const addAuthor = () => {
    setAuthors(authors.concat([""]));
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const changeAuthor = (index: number, value: string) => {
    setAuthors(
      authors.map((oldValue, i) => {
        return index === i ? value : oldValue;
      })
    );
  };

  // Return the full form

  return (
    <div className="container">
      <h1>New Article</h1>
      <form className={formStyles.form} onSubmit={submitNewArticle}>
        <label htmlFor="title">Title:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <label htmlFor="author">Authors:</label>
        {authors.map((author, index) => {
          return (
            <div key={`author ${index}`} className={formStyles.arrayItem}>
              <input
                type="text"
                name="author"
                value={author}
                onChange={(event) => changeAuthor(index, event.target.value)}
                className={formStyles.formItem}
              />
              <button
                onClick={() => removeAuthor(index)}
                className={formStyles.buttonItem}
                style={{ marginLeft: "3rem" }}
                type="button"
              >
                -
              </button>
            </div>
          );
        })}
        <button
          onClick={() => addAuthor()}
          className={formStyles.buttonItem}
          style={{ marginLeft: "auto" }}
          type="button"
        >
          +
        </button>

        <label htmlFor="source">Source:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="source"
          id="source"
          value={source}
          onChange={(event) => {
            setSource(event.target.value);
          }}
        />

        <label htmlFor="pubYear">Publication Year:</label>
        <input
          className={formStyles.formItem}
          type="number"
          name="pubYear"
          id="pubYear"
          value={pubYear}
          onChange={(event) => {
            const val = event.target.value;
            if (val === "") {
              setPubYear(0);
            } else {
              setPubYear(parseInt(val));
            }
          }}
        />

        <label htmlFor="doi">DOI:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="doi"
          id="doi"
          value={doi}
          onChange={(event) => {
            setDoi(event.target.value);
          }}
        />

        <label htmlFor="claim">Claim:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="claim"
          id="claim"
          value={claim}
          onChange={(event) => {
            setClaim(event.target.value);
          }}
        />

        <label htmlFor="evidence">Evidence:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="evidence"
          id="evidence"
          value={evidence}
          onChange={(event) => {
            setEvidence(event.target.value);
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
