import React from "react";
import Button from "../../Button"
const ReloadPageVote = () => {
    return (
        <div className="flex flex-col gap-5 justify-center items-start p-9 rounded-md shadow-md">
            <h1 className="font-medium text-[1.75rem] text-slate-900">Vote is On Going!</h1>
            <p className="font-medium text-sm text-gray-700">
                The registeration session has end!<br/>Please reload the page.
            </p>
            <Button onClick = {() => window.location.reload()} name="Reload Page"/>
        </div>
    );
};

export default ReloadPageVote;