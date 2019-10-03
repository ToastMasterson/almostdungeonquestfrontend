import React from 'react'

const Start = (props) => {

    const handleClick = (event) => (
        props.goBack
            ? props.goBack(null, event.target.getAttribute("number"))
            : props.startGame
                ? props.startGame(event.target.getAttribute("number"))
                : null
        // if(props.didStart === false){
        //     return props.startGame(event.target.getAttribute("number"))
        // }
        // else{
        //     return props.goBack(null, event.target.getAttribute("number"))
        // }
    )

        return(
            <div onClick={handleClick} className="start-tile" number={props.number}>
                
            </div>
        )
}

export default Start