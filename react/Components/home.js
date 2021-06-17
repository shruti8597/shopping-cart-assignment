import React, { useEffect, useState } from 'react';
import '../Styles/home.css';
import { Link } from 'react-router-dom';

export default function () {
  let [categories, setCategories] = useState(null);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let [banner, setBanner] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((er) => {
        setError(er);
        setLoading(false);
      });

    fetch('http://localhost:5000/banners')
      .then((response) => response.json())
      .then((data) => {
        setBanner(data);
      })
      .catch((er) => {
        setError(er);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  else if (error) return <div>Error Occured! Please try again</div>;
  else
    return (
      <>
        {banner && <h1>cdcd</h1>}
        <ul className="category-list">
          {categories.map((_) => (
            <li key={_.id} className="category">
              <div className="category-details">
                <div className="category-title">{_.name}</div>
                <div className="category-description">{_.description}</div>
                <button className="category-explore-button">
                  <Link to={'/products#' + _.id}>Explore {_.name}</Link>
                </button>
              </div>
              <div className="category-right">
                <img className="category-image" src={_.imageUrl} alt={_.name} />
              </div>
            </li>
          ))}
        </ul>
      </>
    );
}
