import React, {Component} from 'react';

export default class PostCard extends Component {
	render(){
		return (
			<div>
				<div className="card post">
            		<div className="card-block">
            			{this.props.children}
            		</div>
          		</div>
			</div>
		)
	}
}