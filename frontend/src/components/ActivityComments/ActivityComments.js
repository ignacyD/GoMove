import './ActivityComments.css';
import {useEffect, useState} from "react";

function ActivityComments({activityID}) {

    const [activityComments, setActivityComments] = useState("");


    useEffect(() => {
        const fetchActivityComments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/comments/${activityID}`,);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setActivityComments(data);
            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        };
        fetchActivityComments();
    }, []);


    console.log(activityComments)

    return (

        <div className={"comments"}>
            <ul>
                {activityComments ?

                    activityComments.map((comment) =>
                        (<li key={comment.commentId}>
                            {`${comment.time} ${comment.userId}: ${comment.message}  `}
                        </li>))
                    : <></>
                }

            </ul>
        </div>
    )

}

export default ActivityComments;