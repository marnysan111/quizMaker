import React, { useState, useEffect } from 'react';
import axios from 'axios';
function ApiFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.get('/hoge')
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.log(error)
    })
  };

  return (
    <div >
            <button
            onClick={handleSubmit}
              type="submit"
            >
              ログイン
            </button>
    </div>
  );
}

export default ApiFetcher;