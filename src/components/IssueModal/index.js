import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactMarkdown from "react-markdown";
import Moment from 'react-moment';


const IssueModal = ({ showModal, setShowModal, selectedIssue, comments, curComments,setCurComments }) => {


  const showMore = () => {
    if (comments.length <= 5) {
      setCurComments(comments);
    } else {
      let startIndex = curComments.length;
      let endIndex = startIndex + 5;
      setCurComments(comments.slice([0], endIndex));
    }
  };

  // useEffect(() => {
  //   const fetchComment = async () => {
  //     if (!selectedIssue) return;
  //     const url = `https://api.github.com/repos/${owner}/${repo}/issues/${selectedIssue.number}/comments?page=1&per_page=5`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     if (response.status === 200) {
  //       console.log(data);
  //       setComments(data);
  //       setCurComments(data.slice([0], [5]));
  //     }
  //   };
  //   fetchComment();
  // }, [selectedIssue]);
  return (
    <div>
      {selectedIssue && (
        <Modal
          size="lg"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
            
              <h4><span className="mr-2">#{selectedIssue.number}</span>{selectedIssue.title}</h4>
              <h6><ReactMarkdown source={selectedIssue.body} /></h6>
              
              {
                
                comments.length > 0?<ul className="list-group mb-4">
                  <h3>Comments:</h3>
                  {curComments.map((comment) => {
                    return (
                      <li className="list-group-item overflow-x-auto" key={comment.body}>
                        <div className="media" key={comment.body}>
                          <img
                            src={comment.user.avatar_url}
                            className="align-self-start mr-3"
                            alt="..."
                            width={100}
                            height={100}
                          />
                          <div className="media-body d-flex flex-column align-items-start justify-content-around mt-2">
                          <h6 className = "style-login">
                                {comment.user.login}
                          </h6>
                          {/* <a href={comment.user.followers_url} target="hihi" >{comment.user.followers_url}</a> */}
                            <h6 className="mt-0 style-login">
                            <i><Moment fromNow>{comment.created_at}</Moment></i>
                              
                            </h6>
                              <h6><ReactMarkdown source={comment.body} /></h6>
                              
                            {/* <div>
                                 {comment.body.split(/(\[.*\]\(.*\))/).map((part,index)=>{
                                  if(index%2===0){
                                    return part;
                                  }
                                  else {
                                    let arr = part.match(/\[(.*)\]\((.*)\)/);
                                    console.log(arr)
                                    return <a href={arr[2]}>{arr[1]}</a>
                                  }})} 
                                  comment.body
                              </div> */}
                              
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  <Button
                    type="button"
                    variant="success"
                    onClick={() => showMore()}
                  >
                    Show more
                  </Button>
                </ul>:
                <h6>No comments</h6>
              }
            </Modal.Title>
          </Modal.Header>
        </Modal>
      )}
    </div>
  );
};

export default IssueModal;
