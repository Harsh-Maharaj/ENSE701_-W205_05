import { FormEvent, useState } from 'react';
import formStyles from '../../styles/Form.module.scss';
import axios from 'axios';

const NewDiscussion = () => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [source, setSource] = useState('');
  const [pubyear, setPubyear] = useState<number | undefined>(undefined);
  const [doi, setDoi] = useState('');
  const [claim, setClaim] = useState('');
  const [evidence, setEvidence] = useState('');

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newArticle = {
      title,
      authors: authors.split(',').map(author => author.trim()),
      source,
      pubyear,
      doi,
      claim,
      evidence,
    };

    try {
      await axios.post('http://localhost:3001/api/articles', newArticle);
      // Handle successful submission (e.g., redirect to articles page or show success message)
    } catch (error) {
      console.error('Error creating article:', error);
      // Handle error (e.g., show error message)
    }
  };

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
          onChange={(event) => setTitle(event.target.value)}
        />
        <label htmlFor="authors">Authors:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="authors"
          id="authors"
          value={authors}
          onChange={(event) => setAuthors(event.target.value)}
        />
        <label htmlFor="source">Source:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="source"
          id="source"
          value={source}
          onChange={(event) => setSource(event.target.value)}
        />
        <label htmlFor="pubyear">Publication Year:</label>
        <input
          className={formStyles.formItem}
          type="number"
          name="pubyear"
          id="pubyear"
          value={pubyear}
          onChange={(event) => setPubyear(parseInt(event.target.value))}
        />
        <label htmlFor="doi">DOI:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="doi"
          id="doi"
          value={doi}
          onChange={(event) => setDoi(event.target.value)}
        />
        <label htmlFor="claim">Claim:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="claim"
          id="claim"
          value={claim}
          onChange={(event) => setClaim(event.target.value)}
        />
        <label htmlFor="evidence">Evidence:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="evidence"
          id="evidence"
          value={evidence}
          onChange={(event) => setEvidence(event.target.value)}
        />
        <button className={formStyles.formItem} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewDiscussion;
