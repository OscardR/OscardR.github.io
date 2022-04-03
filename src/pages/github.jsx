import React from "react";
import { useEffect, useState } from "react";

const GithubPage = () => {
  const [githubData, setGithubData] = useState([]);
  const [githubUser, setGithubUser] = useState("OscardR");

  const fetchData = () => {
    return fetch(`https://api.github.com/users/${githubUser}`)
      .then((response) => response.json())
      .then((data) => setGithubData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <pre>
        <code>{JSON.stringify(githubData, null, "  ")}</code>
      </pre>
    </>
  );
};

export default GithubPage;
