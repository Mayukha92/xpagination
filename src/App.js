
import './App.css';
import { useEffect, useState } from "react";


export default function App() {
  

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchData = async () => {
    try {
      const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      const data = await response.json();
      // console.log(data);
      setData(data);
      setTotalPages(Math.ceil(data.length / 10)); // to divide no. of pages
    } catch (error) {
      console.log("Failed fetchind data,", error);
    }
  };
  useEffect(() => fetchData(), []);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getPaginatedData = () => {
    //to divide data in each page
    let startIndex = (currentPage - 1) * 10;
    let endIndex = currentPage * 10;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <div>
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
          {getPaginatedData().map((ele, index) => (
            <tr key={index}>
              <td>{ele.id}</td>
              <td>{ele.name}</td>
              <td>{ele.email}</td>
              <td>{ele.role}</td>
            </tr>
          ))}
        </table>
      </div>
      <div>
        <button disabled={currentPage === 1} onClick={handlePrevious}>
          previous
        </button>
        <span>{currentPage}</span>
        <button disabled={currentPage === totalPages} onClick={handleNext}>
          next
        </button>
      </div>
    </div>
  );
}