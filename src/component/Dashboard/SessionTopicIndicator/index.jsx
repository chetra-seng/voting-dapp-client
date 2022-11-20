import React from 'react'
const SessionTopicIndicator = (props) => {

    return (
        <div className='flex flex-col item-center justify-start gap-4'>
            <div className={"flex flex-col item-center justify-center font-medium text-sm text-center leading-[.5] max-w-max rounded-md p-[10px] " + props.styles}>{props.name}</div>
            <p className="text-lg font-medium" >{props.vote_title}</p>
        </div>
    );

};

export default SessionTopicIndicator;