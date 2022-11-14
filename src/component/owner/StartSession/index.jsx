import React from 'react'
import SessionTopicIndicator from '../SessionTopicIndicator';
import Button from '../../Button';
const StartSession = (props) => {

    return (
        <div className='flex flex-col item-center justify-start gap-9 rounded-md shadow-md p-9'>
            <SessionTopicIndicator styles="bg-[#D0F1FB] shadow-sm" vote_title={props.vote_title}  name="Not Started"/>
            <Button onClick={props.onClick} name = 'Start The Session'/>
        </div>
    );

};

export default StartSession;