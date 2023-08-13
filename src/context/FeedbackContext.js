import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    const [feedback, setFeedback] = useState([
        {
            id: '1', 
            text: 'Hugo Boss is a boss...',
            rating: 10
        },
        {
            id: '2', 
            text: 'Rain is wet indeed...',
            rating: 7
        },
        {
            id: '3', 
            text: 'Roses are red, and violets are blue...',
            rating: 4
        }
    ]);

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
    };

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        });
    };

    const updateFeedback = (id, updatedItem) => setFeedback(feedback.map((item) => item.id === id ? {...item, ...updatedItem} : item));

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            setFeedback(feedback.filter((item) => item.id !== id));
        }; 
    };

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
};


export default FeedbackContext;