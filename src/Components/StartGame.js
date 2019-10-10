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
                    ? <div className="choose-character-div"><h1 className="choose-a-character">Choose A Character</h1> <ChooseCharacter setCharacter={this.props.setCharacter} /></div>
                    : <div className="start-game">
                        
                        <button className="start-game-button" onClick={this.handleClick}>Start Game</button>
                    </div>
                }
                    
            </div>
        )
    }
}

export default StartGame