import React, {Component} from 'react'

export default class OccupiedTile extends Component {

    handleClick = (event) => {
        this.props.goBack(this.props.tile, event.target.getAttribute("number"))
        // console.log()
    }

    render(){
        return(
            <div className="occupied-tile" 
                number={this.props.number}
                onClick={this.handleClick}
            >
                <img className="tile-image" src={this.props.tile[0][this.props.number].image} />
            </div>
        )
    }
}