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
                    <span>Life Points:</span> <span>{character.life_value}</span>
                    <span>Strength:</span> <span>{character.strength}</span>
                    <span>Agility:</span> <span>{character.agility}</span>
                    <span>Armor:</span> <span>{character.armor}</span>
                    <span>Luck:</span> <span>{character.luck}</span>
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
