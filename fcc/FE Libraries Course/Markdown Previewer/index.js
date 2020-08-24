// Main App component
class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            text: initialText,
        };
    }
    // Updates the text in state, when editor value changes
    handleChange(e) {
        this.setState({
            text: e.target.value,
        });
    }
    render() {
        return (
            <div className="container">
                <div id="edit">
                    <p>Editor</p>
                    <textarea
                        onChange={this.handleChange}
                        value={this.state.text}
                        id="editor"
                    ></textarea>
                </div>
                <div id="prev">
                    <p>Preview</p>
                    <div
                        id="preview"
                        dangerouslySetInnerHTML={{
                            __html: marked(this.state.text),
                        }}
                    ></div>
                </div>
            </div>
        );
    }
}

const initialText = 'Some initial text';

// Render main App component on #app element
ReactDOM.render(<App />, document.getElementById('app'));
