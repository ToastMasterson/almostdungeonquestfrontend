import React, {Component} from 'react'

class Trap extends Component {

    state = {
        isWorking: false,
        message: "",
        dTwelve: [1,2,3,4,5,6,7,8,9,10,11,12],
        dSix: [1,2,3,4,5,6]
        
    }

    attempt = () => {
        this.setState({isWorking: true})
        let rollTwelve = Math.floor(Math.random() * Math.floor(this.state.dTwelve.length))
        let rollSix = Math.floor(Math.random() * Math.floor(this.state.dSix.length))
        switch (this.props.trap.name) {
            case "Cave In":
                rollTwelve < this.props.player.agility
                    ? this.setState({message: "You've successfully passed through! Please continue."}, () => window.setTimeout(()=>this.props.continue(), 2000))
                    : this.props.playerLife(1) 
                        this.setState({message: `You rolled a ${rollTwelve}.  Lose 1 life and continue.`}, () => window.setTimeout(()=>this.props.continue(), 2000))
                break;
            case "Crossfire":
                let cFDamage = rollTwelve - this.props.player.armor
                this.props.playerLife(cFDamage)
                this.setState({message: `You rolled a ${rollTwelve}. You lose ${cFDamage} life points.  Please continue.`}, () => window.setTimeout(()=>this.props.continue(), 2000))
            case "Poisonous Snakes":
                let pSDamage = rollSix - 3
                this.props.playerLife(pSDamage)
                this.setState({message: `You rolled a ${rollSix}. You lose ${pSDamage} life points. Please continue.`}, () => window.setTimeout(()=>this.props.continue(), 2000))
            case "Explosion":
                this.props.playerLife(rollSix)
                this.setState({message: `You rolled a ${rollSix}. You lose ${rollSix} life points. Please continue.`}, () => window.setTimeout(()=>this.props.continue(), 2000))
            case "Giant Spider":
                const passingNumbers = [1,2,3]
                passingNumbers.includes(rollSix)
                    ? this.setState({message: `You rolled a ${rollSix}. You kill the spider and move on!`}, () => window.setTimeout(()=>this.props.continue(), 2000))
                    : this.props.playerLife(1)
                        this.setState({message: `You rolled a ${rollSix}. You lose 1 life and must keep fighting.`}, () => window.setTimeout(() => this.setState({isWorking: false}), 2000))
                default:
                break;
        }

    }


    render(){
        return(
            <div>
                <div className="event-image-container">
                    <img className="events-image" alt="event" src={this.props.trap.image} />
                </div>
                <div className="event-info-container">
                    <div><h1>{this.props.trap.description}</h1></div>
                    {this.state.isWorking
                        ? <p>{this.state.message}</p>
                        : <button onClick={this.attempt}>Roll Dice</button>
                    }
                        
                </div>
            </div>
        )
    }
}

export default Trap

/* Cave-In, Crossfire, Explosion, Poison Snakes, Giant Spider */