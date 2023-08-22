import React from 'react';

const ActivitySmallCard = ({activity}) => {
    return (
        <div>
            <div>{activity.title}</div>
            <div>{activity.activityType}</div>
            <div>{activity.city}, {activity.street}</div>
            <div>{activity.date}, {activity.time}</div>
            <div>---------</div>
        </div>
    );
};

export default ActivitySmallCard;