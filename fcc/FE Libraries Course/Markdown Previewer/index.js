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

// Required initial text
const initialText = `This is some markdown to pe previewed.
# This is a heading of level 1!
## This is a heading of level 2!

This is an [example link](https://google.com)!

\`<div>This is some inline code!<div>\`

\`\`\`html
    <html>
        <body>
            This is some multi-line code!
        </bod>
    </html>
\`\`\`

1. This is a list item.
2. This one too!

> This is a blockquote!

![This is an image](https://en.wikipedia.org/wiki/Google_logo#/media/File:Google_2015_logo.svg)

Finally some **bolded text!**
`;

// Set Marked.js options to pass requirements
marked.setOptions({
    breaks: true,
});

// Render main App component on #app element
ReactDOM.render(<App />, document.getElementById('app'));
