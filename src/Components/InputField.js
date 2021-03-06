import React from 'react';

function isVowel(char){
	return /^[aeiou]$/.test(char.toLowerCase());
}

const InputField = (props) => {
	return (
		<div className="form-group row">
			
			<div className="col-sm-12">
				<input 
				onChange={props.inputAction} 
				type={props.type} 
				id={props.id} 
				className="form-control" 
				placeholder={`Please enter ${isVowel(props.label[0]) ? "an" : "a" } ${props.label}`} 
				/>
			</div>
		</div>	
	)
}

export default InputField;