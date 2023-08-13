import { useContext, useState, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingsSelect from "./RatingsSelect";
import FeedbackContext from "../context/FeedbackContext";

const FeedbackForm = () => {

    const [text, setText] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [msg, setMsg] = useState('');
    const [rating, setRating] = useState(10);
    const {
        addFeedback, 
        feedbackEdit,
        updateFeedback
    } = useContext(FeedbackContext);

    useEffect(() => {

        if(feedbackEdit.edit === true){
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
            console.log('effecteddd...')
        };

    }, [feedbackEdit]);

    const handleTextChange = (e) => {

        if(text === ''){

            setBtnDisabled(true);
            setMsg(null);

        } else if (text !== '' && text.trim().length <= 10){

            setBtnDisabled(true);
            setMsg('Text must be at least 10 characters...');

        } else {

            setBtnDisabled(false);
            setMsg(null);
        };

        setText(e.currentTarget.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(text.trim().length > 10){
            const newFeedback = {
                text,
                rating
            };

            if(feedbackEdit.edit === true){

                updateFeedback(feedbackEdit.item.id, newFeedback);

            } else {

                addFeedback(newFeedback);
            };

            setText('');
        };
    };

    return (
        <Card>
            <form
                onSubmit={handleSubmit}
            >
                <h2>How would you rate our service?</h2>
                <RatingsSelect 
                    select={(rating) => setRating(rating)}
                />
            <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="Write a review"
                        onChange={handleTextChange}
                        value={text}
                    />
                    <Button 
                        type="submit"
                        isDisabled={btnDisabled}
                    >Send</Button>
            </div>
            {msg && <div className="message">{msg}</div>}
            </form>
        </Card> 
    );
}

export default FeedbackForm
