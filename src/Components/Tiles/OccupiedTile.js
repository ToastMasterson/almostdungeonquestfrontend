import React, {Component} from 'react'

export default class OccupiedTile extends Component {

    handleClick = (event) => {
        let number = event.target.getAttribute("number")
        return this.props.goBack
            ? this.props.goBack(this.props.tile[0][number], number)
            : null
        // console.log()
    }

    render(){
        return(
            <div className={this.props.canMoveTo ? "selectable-tile" : "empty-tile"}
                number={this.props.number}
                onClick={this.handleClick}
            >
                <img alt="occupied" number={this.props.number} className="tile-image" src={this.props.tile[0][this.props.number].image} />
            </div>
        )
    }
}