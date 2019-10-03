import React, {Component} from 'react'

export default class OccupiedTile extends Component {

    handleClick = (event) => {
        let number = event.target.getAttribute("number")
        this.props.goBack(this.props.tile[0][number], number)
        // console.log()
    }

    render(){
        return(
            <div className="occupied-tile" 
                number={this.props.number}
                onClick={this.handleClick}
            >
                <img number={this.props.number} className="tile-image" src={this.props.tile[0][this.props.number].image} />
            </div>
        )
    }
}