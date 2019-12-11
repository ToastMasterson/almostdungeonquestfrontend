import React from 'react'

const Start = (props) => {

    const handleClick = (event) => (
        props.goBack
            ? props.goBack(null, event.target.getAttribute("number"))
            : props.startGame
                ? props.startGame(event.target.getAttribute("number"))
                : null
    )

        return(
            <div 
                onClick={handleClick} 
                className={props.didStart 
                    ? props.canMove 
                        ? "selectable-tile"
                        : "start-tile" 
                    : "start-tile-glow"} 
                number={props.number}>
                
            </div>
        )
}

export default Start