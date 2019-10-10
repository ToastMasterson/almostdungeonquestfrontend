import React from 'react'

const YouWin = (props) => {
    return(
        <div className="you-win">
            <h1>You've Won!</h1>
            <p>Would you like to play again?</p>
            <br/>
            <button onClick={() => props.refreshPage()}>Yes</button>
        </div>
    )
}

export default YouWin