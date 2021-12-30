import React from "react";
import { useEffect, useState, Component } from 'react';
import Star from './Star.jsx';
import StarCSS from './cssModules/StarCSS.module.css';
import axios from 'axios';

const StarRating = (props) => {
  const [rating, setRating] = useState([]);

  useEffect(() => {
    const promises = [];
    const avg= []
    promises.push(axios.get('/reviews/meta', { params: { product_id: props.id } })
      .then((res) => {
        console.log(res.data.ratings);
        var ratingsObj = res.data.ratings;
        avg.push(calculateAverage(ratingsObj));
      })
      .catch((err) => {
        console.log(err);
      })
    );
    Promise.all(promises).then(() => {
      console.log(avg);
      setRating(avg);
    });
  }, [])



  const calculateAverage = (ratingsObj) => {
    //console.log(ratingsObj);
    var average = 0;
    var totalScore = 0;
    var numOfReviews = 0;
    for (let el in ratingsObj) {
      totalScore += Number(el) * Number(ratingsObj[el]);
      numOfReviews += Number(ratingsObj[el]);
    }
    average = totalScore / numOfReviews;
    return average.toFixed(2);
  }

  ///will share star component with other widgets
  //need to link common utility folder

  const renderStars = () => {
    let stars = [];
    let maxRating = 5;
    for (let i = 0; i < maxRating; i++) {
      stars.push(
        <Star
          key={i}
        />
      );
    }
    return stars;
  };


  return (
    <div>
      <h4>Average rating: {rating}</h4>
      <ul className={StarCSS.item_stars}>
        {renderStars()}
      </ul>
    </div>
  );
}

export default StarRating;


// isSelected={this.state.rating > i}
          // setRating={() => this.handleSetRating(i + 1)}


  // handleSetRating = (rating) => {
  //   if (this.state.rating === rating) {
  //     this.setState({ rating: 0 });
  //   } else {
  //     this.setState({ rating });
  //   }
  // };