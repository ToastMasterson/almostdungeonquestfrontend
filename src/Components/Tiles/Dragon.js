import React, {Component} from 'react'

export default class Dragon extends Component {

    handleClick = () => {
        this.props.youWin()
    }
    render(){
        return(
            <div className={this.props.canMoveTo ? "dragon-tile-glow" : "dragon-tile"} onClick={this.props.canMoveTo ? this.handleClick : null}>
                
            </div>
        )
    }
}