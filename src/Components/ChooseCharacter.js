import React, {Component} from 'react'

export default class ChooseCharacter extends Component {

    state = {
        characters: []
    }

    componentDidMount(){
        fetch('http://localhost:3000/characters').then(response => response.json())
        .then(result => this.setState({characters: result}))
    }

    handleClick = (character) => {
        this.props.setCharacter(character)
    }

    craftCard = () => {
        return this.state.characters.map(character => (
            <div key={character.name} onClick={() => this.handleClick(character)} className="choose-character-card">
                <h1 className="choose-character-header">{character.name}</h1>
                <h3 className="choose-character-title">{character.title}</h3>
                <img className="choose-character-image" src={character.character_image} alt="character" />
                <div className="choose-character-stats">
                    <div className="stat-name"> Life: 
                        <div className="stat-number"> {character.life_value} </div></div> 
                    <div className="stat-name"> Strength: 
                        <div className="stat-number"> {character.strength} </div></div> 
                    <div className="stat-name"> Agility: 
                        <div className="stat-number"> {character.agility} </div></div> 
                    <div className="stat-name"> Armor: 
                        <div className="stat-number"> {character.armor} </div></div> 
                    <div className="stat-name"> Luck: 
                        <div className="stat-number"> {character.luck} </div></div> 
                </div>
            </div>
        ))
    }

    render(){
        return(
            <div className="choose-character">
                {this.craftCard()}
            </div>
        )
    }

}
