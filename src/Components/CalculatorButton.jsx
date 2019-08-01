import React from "react";
import { evaluate } from "mathjs";

class CalculatorButton extends React.Component {
    constructor(props) {
        super(props);
        this.value = props.value;
        this._function = props._function;
    }
    render() {
        return (<div onClick={() => this._function(this.value)} style={{
            display: "flex",
            flex: 1,
            background: "#20202020",
            margin: "10px",

        }}>{this.value}</div>)
    }
}
export default CalculatorButton