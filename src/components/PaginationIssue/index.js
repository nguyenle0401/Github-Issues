import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationIssue = ({pageNum, totalPageNum, setPageNum}) => {
  const handelClickOnFirst = () =>{
    setPageNum(1);
  }
  const handelClickOnPrev = () => {
    if(pageNum > 1){
      setPageNum((num) => num - 1);
    }
  }
  const handelClickOnLast = () => {
    setPageNum(totalPageNum)
  }
  const handelClickOnNext = () => {
    if( pageNum < totalPageNum){
      setPageNum((num) => num + 1)
    }
  }
  const handeClickOnPage = (page) => {
    setPageNum(page);
  }

  return (
    <Pagination size="lg" className="justify-content-center">
      <Pagination.First disabled = {pageNum === 1} onClick = {handelClickOnFirst} />
      <Pagination.Prev disabled = {pageNum === 1} onClick = {handelClickOnPrev}/>
      <Pagination.Item active = {pageNum === 1} onClick = {handeClickOnPage}>{1}</Pagination.Item>
      { pageNum > 2 && <Pagination.Ellipsis/>}
      

      { pageNum > 1 && pageNum < totalPageNum && (<Pagination.Item active>{pageNum}</Pagination.Item>)}
     

      {totalPageNum > pageNum +1 && <Pagination.Ellipsis/>}
      {totalPageNum > 1 &&
        (<Pagination.Item active = {pageNum === totalPageNum}>{totalPageNum}</Pagination.Item>)
      }
      <Pagination.Next disabled = {pageNum === totalPageNum} onClick = {handelClickOnNext} />
      <Pagination.Last disabled = {pageNum === totalPageNum} onClick = {handelClickOnLast} />
    </Pagination>
  );
};

export default PaginationIssue;