import './ActivityComments.css';
import React, {useEffect, useState} from "react";
import {format} from 'date-fns';

function ActivityComments({currentActivityID}) {
    const [activityComments, setActivityComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    const formattedTime = currentDate.toLocaleTimeString();

    //TODO zmienić na id zalogowanego użytkownika
    const userID = '2222e1a7-7acf-4f50-8275-1449748e96eb';

    const fetchActivityComments = async () => {
        try {
            const response = await fetch(`http://localhost:8080/comments/${currentActivityID}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setActivityComments(data);
        } catch (error) {
            console.error('Error fetching activity data:', error);
        }
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === "") {
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    activityId: currentActivityID,
                    userId: userID,
                    message: newComment,
                    date: formattedDate,
                    time: formattedTime

                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            fetchActivityComments();
            setNewComment("");
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    useEffect(() => {
        fetchActivityComments();
    }, []);

    const handleDeleteComment = async (comment) => {
        try {
            const response = await fetch(`http://localhost:8080/comments/delete/${comment.commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            fetchActivityComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };


    const handleEditComment = async () => {
    }



    return (
        <div className="comments">
            <ul>
                {activityComments.map((comment) => (
                    <li className="commentsList" key={comment.commentId}>
                        {`${comment.time} ${comment.userId}: ${comment.message}`}


                        {comment.userId === userID && (
                            <div>
                                <button onClick={() => handleEditComment(comment)}>Edit</button>
                                <button onClick={() => handleDeleteComment(comment)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div>
                <textarea
                    placeholder="Add a new comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleCommentSubmit();
                        }
                    }}
                    style={{width: '100%'}}
                    rows={4}
                />
            </div>
        </div>
    );
}

export default ActivityComments;
