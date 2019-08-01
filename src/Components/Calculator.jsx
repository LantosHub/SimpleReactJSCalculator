import React from "react";
import { evaluate } from "mathjs";
import CalculatorButton from "./CalculatorButton";

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            answer: "",
        };
        this.add_to_question = this.add_to_question.bind(this);
        this.calculate = this.calculate.bind(this);
        this.delete = this.delete.bind(this);
        this._handle_key = this._handle_key.bind(this);
        this.calculatorRef = React.createRef();
        this.buttons = [
            ["7", "8", "9", "/"],
            ["4", "5", "6", "*"],
            ["1", "2", "3", "-"],
            ["0", ".", "%", "+"],
        ]
    }
    _handle_key(e) {
        console.debug(e);
    }
    add_to_question(value) {
        if (typeof (value) === 'string' || value instanceof String) {
            this.setState({
                question: this.state.question + value
            });
        }
    }
    delete() {
        const tempQuestion = this.state.question.substring(0, this.state.question.length - 1);
        this.setState({ question: tempQuestion });
    }
    calculate() {
        try {
            this.setState({
                answer:
                    evaluate(this.state.question)
            })
        } catch (e) {
            console.debug(e);
            this.setState({
                answer:
                    e.message
            })
        }
    }
    render() {
        return (
            <div ref={this.calculatorRef}

                style={{
                    padding: "15px",

                }}
            >
                <input
                    style={{
                        display: "float",
                        background: "#383b42",
                        height: "10px",
                        color: "white",
                        padding: "10px",
                        outline: "none",
                        border: "none",
                        fontSize: "calc(10px + 2vmin)",
                        color: "white"
                    }}
                    value={this.state.question}
                    onChange={(event) => {
                        this.setState({
                            question: event.target.value
                        });
                    }}

                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            this.calculate();
                        }
                    }}
                />
                <div
                    style={{
                        display: "float",
                        background: "#20202020",
                        height: "30px",
                        padding: "10px",
                        overflowX: "auto"
                    }}
                >
                    {this.state.answer}
                </div>
                <div
                    style={{
                        display: "float",
                        background: "#20202020"
                    }}
                >
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1
                    }}>
                        {this.buttons.map((rows, index) => (
                            <div key={`button_row ${index}`} style={{
                                display: "flex",
                                flex: 1
                            }}>
                                {rows.map((value, index) =>
                                    <CalculatorButton value={value} key={index} _function={this.add_to_question} />)}
                            </div>))
                        }
                        <div style={{
                            display: "flex",
                            flex: 1
                        }}>

                            <CalculatorButton value={"("} _function={this.add_to_question} />
                            <CalculatorButton value={")"} _function={this.add_to_question} />
                            <CalculatorButton value={"="} _function={this.calculate} />
                            <CalculatorButton value={"\u232B"} _function={this.delete} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator;