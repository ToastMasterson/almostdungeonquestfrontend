import React from 'react'

const Empty = () => {
    return(
        <div>
            <div className="event-image-container">
                <img className="event-image" alt="event" src={this.props.event.image} />
            </div>
            <div className="event-info-container">
                <div><h1>The room is empty...</h1><p>Please select a tile to move to...</p></div>
            </div>
        </div>
    )
}

export default Empty