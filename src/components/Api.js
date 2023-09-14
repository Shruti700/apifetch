import React, { useState, useEffect } from 'react';
import axios from 'axios'; // If you're using Axi
const Api = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/products')

        .then(response => {
            // Axios automatically parses the JSON response, so you don't need .json()
            const data = response.data;
            // Use the parsed data
            console.log(data)
            setData(data)
            setLoading(false); 
            return data;
          })
            .catch(error => {
                console.error('Error:', error);
                setError(error);
                setLoading(false); // Data fetching failed
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    // Empty dependency array means this effect runs once after the initial render

    return (
        <div>
            {data.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3> {/* Assuming 'name' is the title */}
          <p>ID: {item.id}</p>
          <p>Slug: {item.slug}</p>
          <p>Permalink: <a href={item.permalink}>{item.permalink}</a></p>
          <p>Date Created: {item.date_created}</p>
          {/* Add other properties as needed */}
        </div>
      ))}
        </div>
    );

}
export default Api;
