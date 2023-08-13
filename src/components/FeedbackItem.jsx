import { useContext, useEffect, useState } from "react";
import { FaTimes, FaEdit } from 'react-icons/fa';
import Card from "./shared/Card";
import PropTypes from 'prop-types';
import FeedbackContext from "../context/FeedbackContext";

const FeedbackItem = ({ item }) => {

    const [rating, setRating] = useState(item.rating);
    const [text, setText] = useState(item.text);
    const {deleteFeedback, editFeedback} = useContext(FeedbackContext);

    useEffect(() => {
      setText(item.text);
      setRating(item.rating);
    }, [item])

    const handleClick = () => setRating(prev => prev + 1);

  return (
    <Card>
      <div className="num-display">{rating}</div>
      <button 
        className="close"
        onClick={() => deleteFeedback(item.id)}
      >
        <FaTimes color="purple" />
      </button>
      <button 
        className="edit"
        onClick={() => editFeedback(item)}
      >
        <FaEdit color="purple"/>
      </button>
      <div className="text-display">{text}</div>
      <button onClick={handleClick}>Click</button>
    </Card>
  );
}

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired
}

export default FeedbackItem
