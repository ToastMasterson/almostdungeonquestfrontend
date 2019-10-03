import React, {Component} from 'react'
import PlayerBar from './PlayerBar';
import GameBoard from './GameBoard'
import EventsBar from './EventsBar';
import StartGame from '../Components/StartGame'

class Main extends Component {

    state = {
        startGame: false,
        choseCharacter: false,
        currentCharacter: {},
        currentEvent: false,
        currentCard: false,
        inEvent: false,
        roomCards: [],
        monsters: [],
        traps: [],
        currentPlayerLife: 0
    }

    componentDidMount(){
        fetch('http://localhost:3000/room_cards')
        .then(response => response.json())
        .then(result => this.setState({roomCards: result}))
        fetch('http://localhost:3000/monsters')
        .then(response => response.json())
        .then(result => this.setState({monsters: result}))
        fetch('http://localhost:3000/trap_cards')
        .then(response => response.json())
        .then(result => this.setState({traps: result}))
    }

    startGame = () => {
        this.setState({
            startGame: true
        })
    }

    setCharacter = (character) => {
        this.setState({
            currentCharacter: character,
            choseCharacter: true,
            currentPlayerLife: character.life_value
        })
    }

    updateEvents = () => {
        this.setState({
            currentEvent: "Move"
        })
    }

    triggerEvent = (kind) => {
        console.log(kind)
        switch (kind) {
            case "Empty":
                this.setState({inEvent: false, currentCard: false, currentEvent: "Move"})
                break;
            case "Monster":
                this.setState({inEvent: true},() => this.triggerBattle())
                break;
            case "Trap":
                this.setState({inEvent: true}, () => this.triggerTrap())
                break;
            case "Potion":
                this.setState({inEvent: false, currentCard: false})
                break;
            default:
                break;
        }
    }

    triggerTrap = () => {
        const randomIndex = Math.floor(Math.random() * Math.floor(this.state.traps.length))
        const trap = this.state.traps[randomIndex]
        this.setState({currentCard: this.state.currentCard, currentEvent: trap})
    }

    triggerBattle = () => {
        const randomIndex = Math.floor(Math.random() * Math.floor(this.state.monsters.length))
        const monster = this.state.monsters[randomIndex]
        this.setState({currentCard: this.state.currentCard, currentEvent: monster})
    }

    drawRoomCard = () => {
        const randomIndex = Math.floor(Math.random() * Math.floor(this.state.roomCards.length))
        this.setState({
            currentCard: this.state.roomCards[randomIndex],
            currentEvent: false
        }, () => window.setTimeout(() => this.triggerEvent(this.state.roomCards[randomIndex].kind), 3000))
    }

    updatePlayerLife = (damage) =>{ 
        this.setState({
            currentPlayerLife: this.state.currentPlayerLife - damage
        })
    }

    continue = () => {
        this.setState({
            inEvent: false,
            currentCard: false,
            currentEvent: "Move"
        })
    }

    render(){
        return(
            <div>
                {this.state.choseCharacter
                    ? <div className="main-area">
                        <PlayerBar playerLife={this.state.currentPlayerLife} character={this.state.currentCharacter} />
                        <GameBoard drawRoomCard={this.drawRoomCard} updateEvents={this.updateEvents}/>
                        <EventsBar player={this.state.currentCharacter} continue={this.continue} playerLife={this.updatePlayerLife} startGame={this.state.startGame} currentCard={this.state.currentCard} currentEvent={this.state.currentEvent} />
                    </div>
                    : <StartGame startGame={this.startGame} chooseCharacter={this.chooseCharacter} setCharacter={this.setCharacter} />
                }
                
            </div>
        )
    }
}

export default Main