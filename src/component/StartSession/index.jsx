import React from 'react'
import Button from '../Button';
const StartSession = (props) => {

    return (
        <div className='flex flex-col item-center justify-start gap-9 w-[450px] rounded-md shadow-md p-9'>
            <div className={"vote-status flex flex-col item-center justify-center font-medium text-sm text-center h-[25px] w-[98px] rounded-md p-[10px] " + 'bg-[' +  props.color_code + ']'}>Not Started</div>
            <div className="vote-title text-lg font-md w-full " >What is the best design tool ?</div>
            <Button name = 'Start The Session'/>
        </div>
    );

};

export default StartSession;