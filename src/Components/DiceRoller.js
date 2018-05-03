import React, {Component} from 'react';

export default class DiceRoller extends Component {
	constructor(props){
		super(props);
		this.state={
			sides:20,
			diceNumber:1,
			roll:1
		};
	};
	setSides(sides){
		this.setState({
			sides
		});
	} ;
	setDiceNumber(diceNumber){
		this.setState({
			diceNumber
		});
	};
	roll(){
		let randomNumber = Math.floor(Math.random() * this.state.sides +1);
		this.setState({roll:randomNumber})
	}
	render(){
		return (
			<div>
				<form>
					<label htmlFor="">Sides</label>
					<input type="number" id="diceSides" min={4} onChange={value => this.setSides(value)} value={this.state.sides} />
					<button onClick={()=>this.roll()}>Roll</button>
				</form>
				<div>
				</div>
			</div>
		)
	}
}