import React from 'react'
const SessionTopicIndicator = (props) => {

    return (
        <div className='flex flex-col item-center justify-start gap-4 w-full'>
            <div className={"flex flex-col item-center justify-center font-medium text-sm text-center h-[25px] w-[98px] min-w-max rounded-md p-[10px] " + props.styles}>{props.name}</div>
            <div className="vote-title text-lg font-md w-full " >{props.vote_title}</div>
        </div>
    );

};

export default SessionTopicIndicator;