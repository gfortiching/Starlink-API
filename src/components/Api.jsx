import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '/src/styles/Api.css'
import Loading from './Loading';


function Api() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [hidden, setHidden] = useState(Array(data.length).fill(true));
  const [search, setSearch] = useState('');

  // Toggle View Details
  const toggleDetails = (index) => {
    const newHidden = [...hidden];
    newHidden[index] = !newHidden[index];
    setHidden(newHidden);
  };

  // useEffect to fetch API
  useEffect(() => {

    // 1000ms Loading Component Timeout
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Promise Statement using axios, data is sorted by the latest Launch Year
    axios.get('https://api.spacexdata.com/v3/launches')
      .then(response => {
        setData(response.data.sort((a, b) => b.launch_year - a.launch_year));
      })
      .catch(error => console.error(error));
  }, []);


  // Search Bar
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Check if Upcoming Launch or Launched
  const isUpcoming = (launch) => {
    const launchDate = new Date(launch.launch_date_utc);
    return launchDate > new Date();
  };

  const success = () => {
    if (launch_success === true) {
      return console.log("Success");
    } return console.log("Fail")
  }

  return (
    <>
    <section className='api-layout'>
      {isLoading ? <Loading /> : // Displays Loading Component or Displays Api Data in the div element
      <div>

        <ul>
        <input
          type="text"
          placeholder="Enter Mission Name here..."
          value={search}
          onChange={handleSearch}
        />

          {data.filter((launch) => launch.mission_name.toLowerCase().includes(search.toLowerCase())).map((launch, index) => (
              <li 
                key={launch.flight_number} 
                className='box'>
              <div>
              <span className='d-flex align-items-center'>
                <h2>{launch.mission_name}</h2>
                <sup>{isUpcoming(launch) ? (
                    <p className='upcoming'>Upcoming Launch</p>
                  ) : (
                    <p className='launched'>Launched</p>
                  )}
                </sup>
              </span>
              <h4>{launch.launch_year}</h4>
              <button onClick={() => toggleDetails(index)} className="view-details">View Details</button>
              </div>

              <div>
                {!hidden[index] ? 
                <p className='details'>{launch.details}</p> : 
                <div className='p-4'>
                  <p className="show-details">Flight No. {launch.flight_number}</p>
                  <p className='show-details'>Launch Date (UTC): {launch.launch_date_utc}</p>
                  <p className='show-details'>Launch Update: {success ? "Successful." : "Unsuccessful."}</p>
                  <h5 className='mt-5'><b>Launch Summary</b></h5>
                  <p className='show-details'>{launch.details}</p>
                </div>}
              </div>

              </li>
          ))}

        </ul>
      </div>
    }
    </section>
    </>
  );
}

export default Api;