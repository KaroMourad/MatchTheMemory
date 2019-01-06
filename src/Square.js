import React, {Component} from "react";

class Square extends Component {
    
    handleClick = () => {
        this.props.onClick(this.props.color);
    }

    render() {
        let initialcolor= "-grey";
        let currentcolor = (!this.props.flp)? initialcolor.split("-")[1]:this.props.color.split("-")[1];
        return (
            <div className="mysquare" style={{background: currentcolor}} onClick={this.handleClick}/>
        );
    }
}

export default Square;

