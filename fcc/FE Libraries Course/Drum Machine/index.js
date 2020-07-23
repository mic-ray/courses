// Sound sources and ID's were copied from the referece CodePen
// https://codepen.io/freeCodeCamp/pen/MJyNMd
const buttons = [
    {
        keyCode: 81,
        keyBtn: 'Q',
        id: 'Heater-1',
        sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    },
    {
        keyCode: 87,
        keyBtn: 'W',
        id: 'Heater-2',
        sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    },
    {
        keyCode: 69,
        keyBtn: 'E',
        id: 'Heater-3',
        sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    },
    {
        keyCode: 65,
        keyBtn: 'A',
        id: 'Heater-4',
        sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    },
    {
        keyCode: 83,
        keyBtn: 'S',
        id: 'Clap',
        sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    },
    {
        keyCode: 68,
        keyBtn: 'D',
        id: 'Open-HH',
        sound: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    },
    {
        keyCode: 90,
        keyBtn: 'Z',
        id: "Kick-n'-Hat",
        sound: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    },
    {
        keyCode: 88,
        keyBtn: 'X',
        id: 'Kick',
        sound: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    },
    {
        keyCode: 67,
        keyBtn: 'C',
        id: 'Closed-HH',
        sound: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    },
];

// Drum Component
class Drum extends React.Component {
    constructor(props) {
        super(props);
        this.playSound = this.playSound.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    // Thanks to Chase Sandmann for providing this code
    // on how to handle key presses on the document with React
    // https://stackoverflow.com/questions/37440408/how-to-detect-esc-key-press-in-react-and-how-to-handle-it
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress, false);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress, false);
    }

    /**
     * Handles the event of a key press
     * @param {*} e Keydown event
     */
    handleKeyPress(e) {
        // If the received keyCode is equal to the one of this drum button
        // Call function to play sound
        if (e.keyCode === this.props.keyCode) this.playSound();
    }

    /**
     * Plays the sound of this drum button
     */
    playSound() {
        // Get the audio element from the DOM
        var sound = document.getElementById(this.props.keyBtn);
        // Reset sound and play it
        sound.currentTime = 0;
        sound.play();
        // Update display with the text of this drum button
        this.props.display(this.props.id);
    }

    render() {
        return (
            <button
                onClick={this.playSound}
                className="drum-pad"
                id={this.props.id}
            >
                {this.props.keyBtn}
                <audio
                    className="clip"
                    id={this.props.keyBtn}
                    src={this.props.sound}
                ></audio>
            </button>
        );
    }
}

// Drums component holding all drums
class Drums extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // For all drum buttons create a Drum component
        const drums = buttons.map((btn, i) => (
            <Drum
                key={i}
                display={this.props.display}
                id={btn.id}
                sound={btn.sound}
                keyBtn={btn.keyBtn}
                keyCode={btn.keyCode}
            />
        ));
        return <div className="drums">{drums}</div>;
    }
}

// Main App component
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastSound: 'None',
        };
        this.changeDisplay = this.changeDisplay.bind(this);
    }
    /**
     * Changes the display of the last played sound
     * @param {*} s String to display
     */
    changeDisplay(s) {
        this.setState({
            lastSound: s,
        });
    }
    render() {
        return (
            <div className="container" id="drum-machine">
                <Drums display={this.changeDisplay} />
                <div id="last-sound">
                    <p>Last played:</p>
                    <p id="display">{this.state.lastSound}</p>
                </div>
            </div>
        );
    }
}

// Render main App component on #app element
ReactDOM.render(<App />, document.getElementById('app'));
