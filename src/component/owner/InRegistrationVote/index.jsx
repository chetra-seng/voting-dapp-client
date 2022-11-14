import React from 'react'
import SessionTopicIndicator from '../SessionTopicIndicator';
const InRegistrationVote = (props) => {

    return (
        <div className='flex flex-col item-center justify-start rounded-md shadow-md p-9'>
            <SessionTopicIndicator styles="bg-[#4CCAF0] shadow-md" name="In Registration" vote_title={props.vote_title}/>
        </div>
    );

};

export default InRegistrationVote;