import React from 'react'

const Start = (props) => {

    const handleClick = (event) => {
        if(props.didStart === false){
            return props.startGame(event.target.getAttribute("number"))
        }
        else{
            return props.goBack(null, event.target.getAttribute("number"))
        }
    }

        return(
            <div onClick={handleClick} className="start-tile" number={props.number}>
                Start
            </div>
        )
}

export default Start