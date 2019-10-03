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
                <img alt="player" className="player-bar-image" src={this.state.image}></img>
                <div className="player-bar-stats">
                    <div className="stat-name"> Life Points: 
                        <div className="stat-number"> {this.props.playerLife} </div></div> 
                    <div className="stat-name"> Strength: 
                        <div className="stat-number"> {this.state.str} </div></div> 
                    <div className="stat-name"> Agility: 
                        <div className="stat-number"> {this.state.agl} </div></div> 
                    <div className="stat-name"> Armor: 
                        <div className="stat-number"> {this.state.arm} </div></div> 
                    <div className="stat-name"> Luck: 
                        <div className="stat-number"> {this.state.luck} </div></div> 
                </div>
            </div>
        )
    }
}