import Button from "@mui/material/Button";
import RepoCard from "./cardStyle";
import { useEffect, useState } from "react";

function App() {
  const [gitrepoData, setGitRepoData] = useState([]);
  const [numberPage, SetNumberPage] = useState(1);
  const mytoken = "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";
  const handleNextClick = () => {
    SetNumberPage((numberPage) => numberPage + 1);
  };
  const handlePreviousClick = () => {
    if (numberPage !== 1) {
      SetNumberPage((numberPage) => numberPage - 1);
    }
  };
  const calucateThirtyDays = new Date();
  calucateThirtyDays.setDate(calucateThirtyDays.getDate() - 30);
  const newFormatDate = calucateThirtyDays.toISOString().split("T")[0];
  useEffect(() => {
    fetch(
      `https://api.github.com/search/repositories?q=created:${newFormatDate}&sort=stars&order=desc&page=${numberPage}`,
      {
        headers: {
          Authorization: `token ${mytoken}`
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setGitRepoData(data.items);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [numberPage, newFormatDate]);
  return (
    <div className="App">
      <h1>MOST STARRED REPOS</h1>
      <div>
        <Button
          variant="contained"
          style={{ margin: "5px" }}
          onClick={handlePreviousClick}
        >
          Previous
        </Button>
        <Button variant="contained" onClick={handleNextClick}>
          NEXT
        </Button>
      </div>
      <div>
        <RepoCard getData={gitrepoData} />
      </div>
      <div>
        <Button
          variant="contained"
          style={{ margin: "5px" }}
          onClick={handlePreviousClick}
        >
          Previous
        </Button>
        <Button variant="contained" onClick={handleNextClick}>
          NEXT
        </Button>
      </div>
    </div>
  );
}

export default App;
