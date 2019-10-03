import React, {Component} from 'react'
import ChooseCharacter from './ChooseCharacter'

class StartGame extends Component {

    state = {
        started: false
    }

    handleClick = () => {
        this.setState({started: true})
    }

    render(){
        return(
            <div >
                {this.state.started
                    ? <><h1 className="choose-a-character">Choose A Character</h1> <ChooseCharacter setCharacter={this.props.setCharacter} /></>
                    : <div className="start-game">
                        <h1 className="start-game-h1">Welcome to (Almost) DungeonQuest!</h1>
                        <br/> 
                        <button className="start-game-button" onClick={this.handleClick}>Start Game</button>
                    </div>
                }
                    
            </div>
        )
    }
}

export default StartGame