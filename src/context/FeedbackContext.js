import { createContext, useEffect, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(true);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        const feedbackResponse = await fetch('/feedback?sort=id&order=desc');
        const data = await feedbackResponse.json();
        setFeedback(data);
        setIsLoading(false);
    };

    const [feedback, setFeedback] = useState([]);

    const addFeedback = async (newFeedback) => {
        const feedbackResponse = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        });

        const data = await feedbackResponse.json();

        setFeedback([data, ...feedback]);
    };

    const editFeedback = (item) => {

        setFeedbackEdit({
            item,
            edit: true
        });
    };

    const updateFeedback = async (id, updatedItem) => {
        const feedbackResponse = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        });

        const data = await feedbackResponse.json();

        setFeedback(feedback.map((item) => item.id === id ? {...item, ...data} : item));
    };

    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            await fetch(`/feedback/${id}`, {method: 'DELETE'});
        }; 
    };

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
};


export default FeedbackContext;