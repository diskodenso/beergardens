import React from 'react'

// create message component
const getStyle = props => {
    let baseClass = "Alert";
    if (props.message.msgError)
        baseClass = baseClass + "Alert-danger";
    else
        baseClass = baseClass + "Alert-primary";
    return baseClass + " text-center";
}
    
const Message = props =>{
    return (
        <div className={getStyle(props)} role="alers">
            {props.message.msgBody}
        </div>
    )
}
export default Message;