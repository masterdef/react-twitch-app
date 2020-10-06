import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

const Search = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  const renderedResults = results.map((res, i) => {
      return <div className="item" key={res.pageid}>
        <div className="right floated content">
          <a className="ui button"
            href={`https://en.wikipedia.org?curid=${res.pageid}`}>
            Go</a>
        </div>
        <div className="content">
          <div className="header">
            {res.title}
          </div>
          {ReactHtmlParser(res.snippet)}
        </div>
      </div>
  });
 
  useEffect(() => {
      const search = async () => {
        const { data } =  await axios.get('https://en.wikipedia.org/w/api.php', {
          params: {
            action: 'query',
            list: 'search',
            origin: '*',
            format: 'json',
            srsearch: term
          }
        });

        setResults(data.query.search);
      }

      if (term) search();
  }, [term]);

  return <div>
    <div className="ui form">
      <div className="field">
        <label>Enter Search Term</label>
        <input value={term}
          onChange={e => setTerm(e.target.value)}
         className="input" />
      </div>
    </div>

    <div className="ui celled list">
      {renderedResults}
    </div>
  </div>
}

export default Search;
