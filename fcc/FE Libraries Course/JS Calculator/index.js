// Button type enum
const Type = Object.freeze({
    op: 'operator',
    num: 'number',
    eval: 'evaluate',
    clear: 'clear',
    dec: 'decimal',
});

// Calculator buttons
const buttons = [
    {
        type: Type.op,
        text: '+',
        id: 'add',
    },
    {
        type: Type.op,
        text: '-',
        id: 'subtract',
    },
    {
        type: Type.op,
        text: '*',
        id: 'multiply',
    },
    {
        type: Type.op,
        text: '/',
        id: 'divide',
    },
    {
        type: Type.num,
        text: '7',
        id: 'seven',
    },
    {
        type: Type.num,
        text: '8',
        id: 'eight',
    },
    {
        type: Type.num,
        text: '9',
        id: 'nine',
    },
    {
        type: Type.eval,
        text: '=',
        id: 'equals',
    },
    {
        type: Type.num,
        text: '4',
        id: 'four',
    },
    {
        type: Type.num,
        text: '5',
        id: 'five',
    },
    {
        type: Type.num,
        text: '6',
        id: 'six',
    },
    {
        type: Type.num,
        text: '1',
        id: 'one',
    },
    {
        type: Type.num,
        text: '2',
        id: 'two',
    },
    {
        type: Type.num,
        text: '3',
        id: 'three',
    },
    {
        type: Type.dec,
        text: '.',
        id: 'decimal',
    },
    {
        type: Type.num,
        text: '0',
        id: 'zero',
    },
    {
        type: Type.clear,
        text: 'AC',
        id: 'clear',
    },
];

// Button Component
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.handleKey = this.handleKey.bind(this);
    }

    handleKey() {
        switch (this.props.type) {
            case Type.num:
                this.props.handleNum(this.props.text);
                break;
            case Type.dec:
                this.props.handleDec();
                break;
            case Type.op:
                this.props.handleOp(this.props.text);
                break;
            case Type.eval:
                this.props.evaluate();
                break;
            case Type.clear:
                this.props.reset();
                break;
        }
    }

    render() {
        return (
            <button
                onClick={this.handleKey}
                className="button"
                id={this.props.id}
            >
                {this.props.text}
            </button>
        );
    }
}
// Main App component
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '0',
            formula: '0',
        };
        this.handleNum = this.handleNum.bind(this);
        this.handleDec = this.handleDec.bind(this);
        this.handleOp = this.handleOp.bind(this);
        this.evaluate = this.evaluate.bind(this);
        this.reset = this.reset.bind(this);
    }
    /**
     * Handles the input of a number
     * @param {String} s Number to be input
     */
    handleNum(s) {
        // Get the current display
        let currentDisplay = this.state.display;
        // Get the current formula
        let formula = this.state.formula;
        // The new String to display
        let newDisplay = '';
        // If the currentDisplay is just a zero
        // or is equal to the answer of a previous equation
        // (To replace the previous answer with new input)
        if (
            currentDisplay === '0' ||
            (formula.includes('=') && currentDisplay === formula.split('=')[1])
        ) {
            // Just add the entered input
            newDisplay = s;
        } else {
            // Otherwise append the entered
            // input to current display
            newDisplay = currentDisplay + s;
        }
        // Update display
        this.setState({
            display: newDisplay,
        });
    }

    /**
     * Handles the input of
     * a decimal point
     */
    handleDec() {
        let currentDisplay = this.state.display;
        // If the last character in the
        // current display is a number
        if (currentDisplay.match(/\d$/)) {
            // Get all the numbers in the current display
            let numbers = currentDisplay.split(/[\*\-\+\/]/);
            // Get the current number, which is the last one entered
            let currentNumber = numbers[numbers.length - 1];
            // If the current number does not have a decimal point yet
            if (!currentNumber.includes('.')) {
                // Update display with appended decimal point
                this.setState({
                    display: currentDisplay + '.',
                });
            }
        }
    }

    /**
     * Handles the input of an operator
     * @param {String} s Operator to be added
     */
    handleOp(s) {
        // If the last character in the
        // current display is a number
        // or one or multiple operators
        // (since input of multiple operators
        // is required to be allowed)
        if (this.state.display.match(/\d$|[\*\-\+\/]+$/))
            // Update display with appended operator
            this.setState({
                display: this.state.display + s,
            });
    }

    /**
     * Evaluates the currently entered expression
     */
    evaluate() {
        // If the last character in the
        // current display is a number
        // (For the case where an operator
        // was input last)
        if (this.state.display.match(/\d$/)) {
            // Remove unnecessary operators
            let evaluate = this.state.display.replace(
                /[\*\-\+\/]+(?!\-?\d)/g,
                ''
            );
            // Evaluate answer
            let answer = eval(evaluate);
            // Update display to show answer
            // and formula to show the
            // evaluated equation
            this.setState({
                display: answer.toString(),
                formula: this.state.display + '=' + answer,
            });
        }
    }

    /**
     * Resets the display
     */
    reset() {
        // Updated display and formula
        // states to display zero values
        this.setState({
            display: '0',
            formula: '0',
        });
    }

    render() {
        const btns = buttons.map((btn, i) => (
            <Button
                key={i}
                id={btn.id}
                text={btn.text}
                type={btn.type}
                handleNum={this.handleNum}
                handleDec={this.handleDec}
                handleOp={this.handleOp}
                evaluate={this.evaluate}
                reset={this.reset}
            />
        ));
        return (
            <div className="container" id="js-calc">
                <div className="output">
                    <div className="formula">{this.state.formula}</div>
                    <div id="display">{this.state.display}</div>
                </div>
                <div className="buttons">{btns}</div>
            </div>
        );
    }
}

// Render main App component on #app element
ReactDOM.render(<App />, document.getElementById('app'));
