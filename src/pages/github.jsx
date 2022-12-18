import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  background: #fafafa;
}

p {
  max-width: max-content;
}

code {
  margin: 0 3px;
  padding: .2em .3em;
  border-radius: .25em;
  color: darkred;
}
`;

const GithubPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [githubData, setGithubData] = useState([]);
  const [githubUser, setGithubUser] = useState("OscardR");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      return await fetch(
        `https://api.github.com/users/${githubUser}/repos`
      ).then((response) => response.json());
    };

    fetchData().then((data) => {
      setGithubData(data);
      setIsLoading(false);
    });
  }, [githubUser]);

  const copyCloneURL = (e) => {
    navigator.clipboard.writeText(e.target.value).then(
      () => console.log(`'${e.target.value}' copied to clipboard!`, e.target),
      (err) => console.error("Async: Could not copy text: ", err)
    );
  };

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Github Repos</title>
      </Helmet>

      <GlobalStyle />
      <div className="container">
        <h1>Github Repos</h1>
        <input
          type="text"
          className="input"
          placeholder={githubUser}
          onChange={(e) => console.log(e.target.value)}
        />
        {isLoading ? <i className="fa fa-spin fa-spinner"></i> : <></>}
        <div className="row">
          {githubData.map((repo) => (
            <div className="col col-xs-12 col-sm-6 col-md-4 col-lg-3 pb-4">
              <div className="card" style={{ height: `calc(100%)` }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    <a href={repo.html_url}>{repo.name}</a>
                  </h5>
                  <h6 className="card-subtitle text-muted">
                    <strong>Language:</strong> {repo.language}
                  </h6>
                  <p className="card-text">{repo.description}</p>

                  <button
                    className="btn btn-success mt-auto"
                    onClick={copyCloneURL}
                    value={repo.ssh_url}
                  >
                    <i className="fa fa-copy"></i>&ensp; Copy clone URL
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h3>Github API return:</h3>
        <pre>
          <code>{JSON.stringify(githubData, null, "  ")}</code>
        </pre>
      </div>
    </>
  );
};

export default GithubPage;
