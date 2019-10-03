import React, {Component} from 'react'
import Grid from 'react-css-grid'
import Start from '../Components/Tiles/Start'
import Dragon from '../Components/Tiles/Dragon'
import EmptyTile from '../Components/Tiles/EmptyTile'
import OccupiedTile from '../Components/Tiles/OccupiedTile'
import YouWin from '../Components/YouWin'

export default class GameBoard extends Component{


    state = {
        startPoints: [130, 118, 13, 1],
        dragonPoints: [59, 72],
        didStart: false,
        isOccupied: false,
        startTile: 0,
        currentTile: 0,
        canMoveTo: [],
        allTiles: [],
        occupiedTiles: [],
        occupiedTileNumbers: [],
        newTile: {},
        tileToUpdate: 0,
        direction: "",
        top: true,
        bottom: true,
        left: true,
        right: true,
        didWin: false
    }

    componentDidMount(){
        fetch('http://localhost:3000/tiles')
        .then(response => response.json())
        .then(result => this.setState({allTiles: result}))
    }

    startGame = (tile) => {
        this.setState({
            didStart: true,
            startTile: tile,
            currentTile: tile,
        }, () => this.updateMoves())
        this.props.updateEvents()
        
    }

    goBack = (tile, number) => {
        this.state.startPoints.includes(parseInt(number))
            ? this.setState({
                currentTile: number,
                top: true,
                bottom: true,
                left: true,
                right: true
            }, () => this.updateMoves())
            : this.setState({
                currentTile: number,
                top: tile.top,
                bottom: tile.bottom,
                left: tile.left,
                right: tile.right
            }, () => this.updateMoves(), this.props.drawRoomCard())
    }

    updateMoves = () => {
        this.setState({
            canMoveTo: [
                this.state.top && this.state.top === true
                    ? parseInt(this.state.currentTile) + 13
                    : null,
                this.state.left && this.state.left === true
                    ? parseInt(this.state.currentTile) + 1
                    : null,
                this.state.bottom && this.state.bottom === true
                    ? parseInt(this.state.currentTile) - 13
                    : null, 
                this.state.right && this.state.right === true
                    ? parseInt(this.state.currentTile) - 1
                    : null]
        })
    }

    generateCard = (tile) => {
        console.log("here")
        console.log(parseInt(tile))
        console.log(this.state.currentTile)
        if (parseInt(tile) === parseInt(this.state.currentTile) - 1){
            this.setState({direction: "right"}, () => this.matchTile(tile))
        } 
        else if (parseInt(tile) === parseInt(this.state.currentTile) + 1){
            console.log("left")
            this.setState({direction: "left"}, () => this.matchTile(tile))
        }
        else if (parseInt(tile) === parseInt(this.state.currentTile) - 13){
            this.setState({direction: "bottom"}, () => this.matchTile(tile))
            }
        else if (parseInt(tile) === parseInt(this.state.currentTile) + 13){
            this.setState({direction: "top"}, () => this.matchTile(tile))
        }
        else { return null }
        
    }

    matchTile = (tileToUpdate) => {
        const filtered = this.state.allTiles.filter(tile => {
            switch (this.state.direction) {
                case "right":
                    return tile["left"] === true
                    break;
                case "left":
                    return tile["right"] === true
                    break;
                case "top":
                    return tile["bottom"] === true
                    break;
                case "bottom":
                    return tile["top"] === true
                default:
                    break;
            }
        })
        const randomIndex = Math.floor(Math.random() * Math.floor(filtered.length))
        this.setState({
            newTile: filtered[randomIndex],
            tileToUpdate: tileToUpdate,
            currentTile: tileToUpdate,
            occupiedTiles: [...this.state.occupiedTiles, {[tileToUpdate]: filtered[randomIndex]}],
            occupiedTileNumbers: [...this.state.occupiedTileNumbers, tileToUpdate],
            top: filtered[randomIndex].top,
            bottom: filtered[randomIndex].bottom,
            left: filtered[randomIndex].left,
            right: filtered[randomIndex].right
        }, () => this.updateMoves())
        this.props.drawRoomCard()
    }

    checkIfOccupied = (item) => (
        this.state.occupiedTiles[item]
            ? true
            : false
    )

    youWin = () => {
        this.setState({didWin: true})
    }

    occupyTiles = (tileArray) => {
        return tileArray.map(item => {
            if ( this.state.startPoints.includes(item)){
                return <Start
                    goBack={this.props.inEvent
                        ? null
                        : this.state.canMoveTo.includes(item) 
                            ? this.goBack 
                            : false} 
                    startGame={this.props.inEvent
                        ? null
                        : this.state.didStart ? null : this.startGame} 
                    key={item} number={item} 
                    didStart={this.state.didStart ? true : false} />
            } 
            else if (this.state.dragonPoints.includes(item)){
                return <Dragon key={item} 
                    canMoveTo={this.state.canMoveTo.includes(item)
                        ? true : false}
                    youWin={this.youWin} />
            } 
            else {
                return this.state.occupiedTileNumbers.includes(item.toString())
                    ? <OccupiedTile 
                        goBack={this.props.inEvent
                            ? null
                            : this.state.canMoveTo.includes(item)
                                ? this.goBack
                                : null
                        } 
                        tile={this.state.occupiedTiles.filter(object => object[item])} 
                        item={item} key={item.toString()} 
                        number={item} 
                        className={item}
                        canMoveTo={this.state.canMoveTo.includes(item)
                            ? true : false}
                        />
                    : <EmptyTile 
                        generateCard={
                            this.state.didStart
                                ? this.props.inEvent
                                    ? null
                                    : this.state.canMoveTo.includes(parseInt(item)) 
                                        ? this.generateCard 
                                        : null 
                                :null} 
                        tile={
                            this.state.tileToUpdate === item.toString()
                                ? this.state.newTile
                                : null
                        }
                        item={item} key={item.toString()}
                        number={item} className={item}
                        canMoveTo={this.state.canMoveTo.includes(item)
                            ? true : false}
                    />
            }
        })
    }

    createBoard = () => {
        let tileArray = []
        for (let counter = 130; counter > 0; counter--){
            tileArray.push(counter)
        }
        return this.occupyTiles(tileArray)
    }

    render(){
        return(
            <div className="board-container">
                {this.state.didWin
                    ? <YouWin refreshPage={this.props.refreshPage} />
                    : <div className="game-board">
                        <Grid
                            width={50}
                            gap={0}
                            >
                            {this.createBoard()}
                        </Grid>
                    </div>
                }
                
            </div>
        )
    }
}