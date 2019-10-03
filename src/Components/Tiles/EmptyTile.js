import React, {Component} from 'react'

export default class Tile extends Component {

    state = {
        occupied: false,
        top: false,
        bottom: false,
        left: false,
        right: false
    }

    handleClick = (event) => {
        this.props.generateCard(event.target.getAttribute("number"))
    }
    render(){
        return(
            <div className={this.props.canMoveTo ? "selectable-tile" : "empty-tile"} onClick={this.props.generateCard === null ? null : this.handleClick} number={this.props.number}>
                {this.props.tile
                    ? <img alt="empty" className="tile-image" src={this.props.tile.image} />
                    : null
                }
            </div>
        )
    }
}