import React from "react";
import Button from "../../Button"
const ReloadPageVote = (props) => {
    return (
        <div className={"min-w-[30vw] max-w-[50vw] flex flex-col gap-5 justify-center items-start p-9 rounded-md shadow-md " + props.styles}>
            <h1 className="font-medium text-[1.75rem] text-slate-900 tracking-wider">Vote is On Going!</h1>
            <p className="font-medium text-sm text-gray-700">
                The registeration session has end! Please reload the page.
            </p>
            <Button onClick = {() => window.location.reload()} name="Reload Page"/>
        </div>
    );
};

export default ReloadPageVote;