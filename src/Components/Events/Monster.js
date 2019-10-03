import React, {Component} from 'react'

class Monster extends Component {

    state = {
        isWorking: false,
        lifeValue: 0,
        outcome: "",
        combatArray: ["Mighty Blow", "Slash", "Dodge"]
    }

    componentDidMount(){
        this.setState({lifeValue: this.props.monster.life_value})
    }

    checkMonsterLife = () => {
        if (this.state.lifeValue <= 0){
            this.setState({combatMessage: "You have defeated the monster! You may continue onward!"}, () => window.setTimeout(()=>this.props.continue(), 2000))
        } else{
            this.setState({isWorking: false})
        }
    }

    handleClick = (event) => {
        this.setState({isWorking: true})
        const randomIndex = Math.floor(Math.random() * Math.floor(this.state.combatArray.length))
        const monsterMove = this.state.combatArray[randomIndex]
        console.log(event.target.innerText)
        switch(event.target.innerText){
            case "Mighty Blow":
                if (monsterMove === "Mighty Blow"){
                    this.setState({combatMessage: "It's a draw! No damage done."}, () => window.setTimeout(() => this.checkMonsterLife(), 2000))
                } else if (monsterMove === "Slash"){
                    this.setState({combatMessage: "Successful hit! Monster loses 2 life points", lifeValue: this.state.lifeValue - 2}, () => window.setTimeout(() => this.checkMonsterLife(), 2000))
                } else {
                    this.props.playerLife(1)
                    this.setState({combatMessage: "Monster got around you! Lose 1 life."}, () => window.setTimeout(() => this.checkMonsterLife(), 2000))
                }
                break;
            case "Slash":
                if (monsterMove === "Mighty Blow"){
                    this.props.playerLife(1)
                    this.setState({combatMessage: "Monster got around you! Lose 1 life."}, () => window.setTimeout(() => this.checkMonsterLife(), 2000))
                } else if (monsterMove === "Slash"){
                    this.props.playerLife(1)
                    this.setState({combatMessage: "An even match! Each loses 1 life.", lifeValue: this.state.lifeValue - 1}, () => window.setTimeout(() => this.checkMonsterLife(), 2000))
                } else {
                    this.setState({combatMessage: "Successful hit! Monster loses 1 life point", lifeValue: this.state.lifeValue -1}, () => window.setTimeout(() => this.checkMonsterLife(), 2000))
                }
                
                break;
            case "Dodge":
                if (monsterMove === "Mighty Blow"){
                    this.setState({combatMessage: "You got around the monster! Monster loses 1 life point.", lifeValue: this.state.lifeValue -1}, () => window.setTimeout(() => this.checkMonsterLife(), 2000))
                } else if (monsterMove === "Slash"){
                    this.props.playerLife(1)
                    this.setState({combatMessage: "Monster got around you! Lose 1 life."}, () => window.setTimeout(() => this.checkMonsterLife(), 2000))
                } else {
                    this.props.playerLife(1)
                    this.setState({combatMessage: "An even match! Each loses 1 life", lifeValue: this.state.lifeValue -1}, () => window.setTimeout(() => this.checkMonsterLife(), 2000))
                }
                break;
            default:
                break;
        }
    }

    chooseOption = () => (
        <div>
            <h1>Battle! Choose an Option!</h1>
            <p>{`Monster has ${this.state.lifeValue} life points left`}</p><br/>
            <button className="encounter-option" onClick={this.handleClick}>Mighty Blow</button>
            <button className="encounter-option" onClick={this.handleClick}>Slash</button>
            <button className="encounter-option" onClick={this.handleClick}>Dodge</button>
        </div>
    )

    renderOutcome = () => (
        <div className="event-message">
            {this.state.combatMessage}<br/>
            {`Monster has ${this.state.lifeValue} life points left`}
        </div>
    )
    
    render(){
        return(
            <div>
                <div className="event-image-container">
                    <img className="event-image" alt="event" src={this.props.monster.image} />
                </div>
                <div className="event-info-container">
                    {this.state.isWorking
                        ? this.renderOutcome()
                        : this.chooseOption()
                    }
                    
                </div>
            </div>
        )
    }
}

export default Monster