import React from 'react';


const VoteNotStarted = (props) => {
    return (
        <div className={'flex flex-col justify-center gap-4 rounded-md items-start p-5 shadow-md ' + props.styles} >
            <p className='font-bold text-xl'>Vote Not Started</p>
            <p className='inter-small text-gray-700'>We’ll let you let you know when the vote is available </p>
            <p className='max-w-fit font-semibold text-sm text-primary-dark px-1.5 py-1 bg-tertiary-100 rounded-md'>In Registration</p>
        </div>
    );
};

export default VoteNotStarted;