import React from "react";
import { Button } from "react-bootstrap";
import Moment from 'react-moment';
const IssueList = ({ issues, showDetail }) => {
  return (
    <ul className="list-group mb-4">
      {issues.map(issue => {
        return (
          <li className="list-group-item" key={issue.id}>
            <div className="media" key={issue.id}>
              <img src={issue.user.avatar_url} className="align-self-start mr-3" alt="..." width={100} height={100} />
              <div className="media-body d-flex flex-column align-items-start justify-content-around mt-2">
                <h5 className="mt-0 d-flex align-items-start">
                  #{issue.number} {issue.title}
                </h5>
                <span>
                  <div className="d-flex align-items-start">
                  #{issue.user.login}
                  </div>
                  <div className="d-flex align-items-start style-login">
                   <i>Last update: <Moment fromNow>{issue.updated_at}</Moment></i>
                  </div>
                  <div className="d-flex flex-column align-items-start">
                   Comments: {issue.comments}
                  </div>
                </span>
              </div>
            </div>
            <Button variant="outline-success" size="lg" block onClick={() => showDetail(issue)}>
              Show Details
            </Button>
          </li>
        );
      })}
    </ul>
  );
};
export default IssueList;
