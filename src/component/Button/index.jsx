import React from 'react'

const Button = (props) => {
    return (
        <div onClick = {props.onClick} className=" flex items-center justify-center mx-auto gap-2 w-full rounded-md text-slate-100 bg-[#337ee8] hover:bg-[#337ee8]/90 hover:text-white hover:shadow-md active:scale-[.99] active:bg-[#337ee8]/70 cursor-pointer p-2">{props.name}</div>
    );
};

export default Button;