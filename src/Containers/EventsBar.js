import React, {Component} from 'react'
import Move from '../Components/Events/Move';
import Trap from '../Components/Events/Trap'
import Monster from '../Components/Events/Monster';
import Empty from '../Components/Events/Empty';

export default class EventsBar extends Component{

    state = {
        image: "https://lh3.googleusercontent.com/AxJdu0RzeHTS9jdHhGYL-DjE5Z9PkKdqjR2E15GQB8hwqMredl6nRc1ZdmQqfVH5Imq1SEH_FFc0EXih_KRWd0OLwmzhcYccEwyx231pUFNo3za35_AGPCNTzl1w06R5L_LImaVZlJWC43f1NGvtek4uoAjEbGI7RZqUShHIubNUZsv0laR1lLnqFQdGTQB6nc4Wh49GquyoLdYbBuwoiufLL935Do5qDu4lWUDOxOX38wcwORpk1PLSTVuavTNfez-Y8HKmwsInG-lwmt5YGXIySpSC99j8FDWfIluTcByEOFqe3jtDfz171nCMCHaz_Ovo6bvuMjyWpwoGPvHGldsA4bjlnVs7M64lbdiBb1v9Qrr7ZhqdyqobKVYNZesWMQSMp8kqb_TboZf3wSqLMXEQf_48EFMQuPwY8hgJOpLLVaMLXckqcLIQCcD5W0B_9eUlxmgVkY_ICwplIiemv4R9XU_day6C1e_AwYyyophmFXugdYm-fF6XquHQbUnNmSPhfn0O7C3N81ez5DM3_ObQZDiHWwFQWXPAg0VAmcsPMSmNVOLV9J0L-O5khLWDg2oPYxThhl4djrtJn7IuE4qN6gKjFi5ftycwplQ5SvA7JQFzM7bDM0CFAUewlrs_y8X2ud0zrV4q2_OQc17H24ptzJn4tHOM0RPISFKJjMssJKeq_W4La40=w287-h519-no"
    }

    checkCardType = () => {
        if (this.props.currentEvent === "Move"){
            return <Move />
        }
        else{
            switch(this.props.currentCard.kind){
                case "Monster":
                    return <Monster continue={this.props.continue} playerLife={this.props.playerLife} monster={this.props.currentEvent} />
                    break;
                case "Trap":
                    return <Trap continue={this.props.continue} playerLife={this.props.playerLife} player={this.props.player} trap={this.props.currentEvent} /> 
                    break;
                case "Empty":
                    return <Empty />
                default:
                    return this.renderCard()
                    break;
            }
        }
    }

    renderCard = () => (
        <><div className="event-image-container">
            <img className="event-image" alt="event" src={this.props.currentCard.image} />
            </div>
            <div className="event-info-container">
                <div><h1 className="event-message">{this.props.currentCard.description}</h1></div>
            </div>
        </>
    )

    render(){
        return(
            <div className="events-bar">
                <h1 className="events-header">Events:</h1>
                {this.props.currentEvent
                    ? this.checkCardType()
                    : this.props.currentCard
                        ? this.renderCard()
                        :<><div className="event-image-container">
                            <img className="event-image" alt="event" src={this.state.image} />
                            </div>
                            <div className="event-info-container">
                                <div><h1 className="event-message">Please select a tile to start on...</h1></div>
                            </div>
                        </>
                }
                
            </div>
        )
    }
}