import React, { Component } from 'react';
import './Box.css';

class Box extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            up: props.up || false,
            left: props.left || false,
            right: props.right || false,
            down: props.down || false
         }
    }

    componentWillReceiveProps(props) {
      this.setState(props);
    }

    onClick = (key, e) => {
        this.setState({
          [key]: !this.state[key]
        });
        this.props.report(this.props.id,key, !this.state[key]);
    };

    onChange = (e) => {
      this.setState({
        number: e.target.value
      });
      this.props.report(this.props.id, 'number', e.target.value);
    };

    render() {
        return (
            <div className="box">
              {!this.props.topPiece ? <div className={`line horizontal ${this.state.up ? 'clicked': ''} ${!this.props.leftPiece ? 'left-margin' : ''}`} onClick={this.onClick.bind(this, 'up')}/> : ''}
              <div className="sideways">
                {!this.props.leftPiece ? <div className={`line vertical ${this.state.left ? 'clicked': ''}`} onClick={this.onClick.bind(this, 'left')}/> : ''}
                <input type="text" onChange={this.onChange}/>
              </div>
            </div>
        );
    }
}

export default Box;
