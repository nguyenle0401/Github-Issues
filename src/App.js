import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Alert } from "react-bootstrap";
import Search from "./components/Search";
import PaginationIssue from "./components/PaginationIssue";
import IssueList from "./components/IssueList";
import IssueModal from "./components/IssueModal";
import ClipLoader from "react-spinners/ClipLoader";


function App() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum,setTotalPageNum] = useState(1)
  const [issues, setIssues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [curComments, setCurComments] = useState([]);
  


  const [searchTerm, setSearchTerm] = useState("facebook/react");

  const handleSubmitSearchForm = (event) => {
    event.preventDefault();
    // Get the url
    const repo = searchTerm.substring(searchTerm.lastIndexOf("/") + 1);
    const withoutRepo = searchTerm.substring(0, searchTerm.lastIndexOf("/"));
    const owner = withoutRepo.substring(withoutRepo.lastIndexOf("/") + 1);
    if (!repo || !owner) {
      setErrorMsg("Wrong Input");
    } else {
      setErrorMsg(null)
      setRepo(repo);
      setOwner(owner);
    }
  };

  useEffect(() => {
    const fetchIssue = async () => {
      if (!owner || !repo) return;
      setLoading(true);
      const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}&per_page=20`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("ahihi",data)
        setErrorMsg(null);
        if (response.status === 200) {
          const link = response.headers.get("link")
          if (link){
            const getTotalPage = link.match(/page=(\d+)>; rel="last"/)
            console.log(getTotalPage)
            if(getTotalPage){
              setTotalPageNum(parseInt(getTotalPage[1]));
            }
          }
          setIssues(data);
        } else {
          console.log("Not 200", data.message)
          setErrorMsg(data.message);
        }
      } catch (error) {
        console.log("Error", error.message)
        setErrorMsg(error.message);
      }
      setLoading(false);
      // setErrorMsg(null)
    };
    fetchIssue();

    const fetchComment = async () => {
      if (!selectedIssue) return;
      const url = `https://api.github.com/repos/${owner}/${repo}/issues/${selectedIssue.number}/comments?page=1&per_page=5`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        setComments(data);
        setCurComments(data.slice([0], [5]));
      }
    };
    fetchComment();
  }, [owner, repo, pageNum,selectedIssue]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const showDetail = (issue) => {
    setShowModal(true)
    setSelectedIssue(issue)
  }

  console.log("hehe",selectedIssue)
  return (
    <div className="App">
      <Container>
        <h1>Github Issues</h1>
        <Search
          searchTerm={searchTerm}
          handleSubmit={handleSubmitSearchForm}
          handleChange={handleSearchInputChange}
        />
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        <PaginationIssue 
        pageNum = {pageNum} 
        totalPageNum = {totalPageNum} 
        setPageNum = {setPageNum}/>
        {loading ? (
          <ClipLoader color="green" size={150} loading={true} />
        ) : (
          <IssueList  issues={issues} showDetail = {showDetail} />
        )}
         < IssueModal
         selectedIssue = {selectedIssue}
         showModal = {showModal} 
         setShowModal = {setShowModal}
         owner = {owner}
         repo = {repo}
         //comments, curComments,setCurComments 
         comments = {comments}
         curComments = {curComments}
         setCurComments = {setCurComments}
         />
      </Container>
    </div>
  );
}

export default App;