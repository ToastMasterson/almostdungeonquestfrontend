import React, {Component} from 'react'

export default class PlayerBar extends Component {

    state = {
        character: this.props.character.name,
        title: this.props.character.title,
        image: this.props.character.character_image,
        life: this.props.character.life_value,
        str: this.props.character.strength,
        agl: this.props.character.agility,
        arm: this.props.character.armor,
        luck: this.props.character.luck
    }

    render(){
        return(
            <div className="player-bar">
                <h1 className="player-bar-header">Player Stats:</h1>
                <h2 className="player-bar-character">{this.state.character}</h2>
                <h3 className="player-bar-title">{this.state.title}</h3>
                <img className="player-bar-image" src={this.state.image}></img>
                <div className="player-bar-stats">
                <span>Life Points:</span> <span>{this.props.playerLife}</span>
                    <span>Strength:</span> <span>{this.state.str}</span>
                    <span>Agility:</span> <span>{this.state.agl}</span>
                    <span>Armor:</span> <span>{this.state.arm}</span>
                    <span>Luck:</span> <span>{this.state.luck}</span>
                </div>
            </div>
        )
    }
}