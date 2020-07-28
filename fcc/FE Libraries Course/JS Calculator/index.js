const buttons = [
    {
        keyCode: 87,
        text: '+',
        id: 'add',
    },
    {
        keyCode: 87,
        text: '-',
        id: 'subtract',
    },
    {
        keyCode: 69,
        text: '*',
        id: 'multiply',
    },
    {
        keyCode: 65,
        text: '/',
        id: 'divide',
    },
    {
        keyCode: 83,
        text: '7',
        id: 'seven',
    },
    {
        keyCode: 83,
        text: '8',
        id: 'eight',
    },
    {
        keyCode: 83,
        text: '9',
        id: 'nine',
    },
    {
        keyCode: 83,
        text: '=',
        id: 'equals',
    },
    {
        keyCode: 83,
        text: '4',
        id: 'four',
    },
    {
        keyCode: 83,
        text: '5',
        id: 'five',
    },
    {
        keyCode: 83,
        text: '6',
        id: 'six',
    },
    {
        keyCode: 83,
        text: '1',
        id: 'one',
    },
    {
        keyCode: 83,
        text: '2',
        id: 'two',
    },
    {
        keyCode: 83,
        text: '3',
        id: 'three',
    },
    {
        keyCode: 83,
        text: '.',
        id: 'decimal',
    },
    {
        keyCode: 83,
        text: '0',
        id: 'zero',
    },
    {
        keyCode: 83,
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
        if (this.props.id === 'clear') {
            this.props.resetDisplay();
        } else this.props.changeDisplay(this.props.text);
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

class Buttons extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const btns = buttons.map((btn, i) => (
            <Button
                key={i}
                changeDisplay={this.props.changeDisplay}
                resetDisplay={this.props.resetDisplay}
                id={btn.id}
                text={btn.text}
                keyCode={btn.keyCode}
            />
        ));
        return <div className="buttons">{btns}</div>;
    }
}

// Main App component
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '0',
        };
        this.changeDisplay = this.changeDisplay.bind(this);
        this.resetDisplay = this.resetDisplay.bind(this);
    }
    /**
     * Changes the display
     * @param {*} s String to display
     */
    changeDisplay(s) {
        if (this.state.display.startsWith('0')) {
            this.setState({
                display: s,
            });
        } else
            this.setState({
                display: this.state.display + s,
            });
    }

    /**
     * Resets the display
     */
    resetDisplay() {
        this.setState({
            display: '0',
        });
    }
    render() {
        return (
            <div className="container" id="js-calc">
                <div id="display">{this.state.display}</div>
                <Buttons
                    resetDisplay={this.resetDisplay}
                    changeDisplay={this.changeDisplay}
                />
            </div>
        );
    }
}

// Render main App component on #app element
ReactDOM.render(<App />, document.getElementById('app'));
