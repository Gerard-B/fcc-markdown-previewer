import React, { Component } from 'react';
import './App.css';
// These are the dependancies we will use for the project:
// Be aware: the links changed in the couple last years (https://backbencher.dev/blog/react-bootstrap-controllabel-warning), check documentation if they break again
//Formgroup class basically groups together forms (hence the name)
import FormGroup from "react-bootstrap/FormGroup";
//Formlabel is the label for the textarea
import FormLabel from "react-bootstrap/FormLabel";
//Formcontrol is the text-area itself
import FormControl from "react-bootstrap/FormControl";
//Found interesting options in documenatation and decided to try out rows and columns in the library instead of other bootstrap options
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

//The next line brings in the marked-library
let marked = require("marked");

//I decided to go for the old-fashioned React Class Component instead of a Function Component
// so I had to delete this start: "function App() {"

//"It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http://google.com)";

// I was stuck here for a bit because I tried to make a multi-line/unterminated -string, but learned to use "template literals" (backticks: `)

// a header (H1 size), a sub header (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text

const initialState = `First of all: [great documentation](https://www.markdownguide.org/basic-syntax/) to take Markdown syntax to the next level

Then the requirements to pass the FCC-tests:

# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.
Underline is not available in markdown,
Bold is shown in the next line:

There's also [Visit my GitHub](https://github.com/Gerard-B/) **this is actually a link to my GitHub :D**, and
> Block Quotes!

And if you want to get really crazy, even tables:

Somehow tables don't work unfortunately :( :
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![Camera](public/cameraUnsplash.jpeg)`;


class App extends Component {

  state = {
    markdown: initialState
  }

  updateMarkdown = function (markdown) {
    //thanks to ES6 we dont have to write "markdown:value" within this.setState().
    //no bind required due to ES6 function (although I didn't use the cool-arrow function. Possibly no super required either due to assigning this.state to a variable in a few lines)
    this.setState({ markdown });
  }

  render() {
    //by creating this variable, we don't have to write this.state.markdown at the value in FormControl
    //so this let {markdown} says: "let this value hold whatever this.state.markdown is"
    let { markdown } = this.state;
    return (
      // bootstrap calls container is used, consider to use "container" later
      <div className="App container-fluid">
        <div class="h5 text-dark mt-2"> This website is a project for <a class="badge badge-secondary" target="_blank" rel="noopener noreferrer" href="https://www.freecodecamp.com" id="link-fcc" alt="Check out FreeCodeCamp"> FreeCodeCamp </a> </div>
    <br></br>
        <Row>
          <Col>

            {/* See information of these Form-items above at the import part */}
            <FormGroup controlId="FormControlTextArea">

              <FormLabel className="title"><h2>Markdown Input</h2></FormLabel>

              {/* The logic here: we want to change the input of the textbox to markdown, VIA STATE. The "e" in the next time is "event" */}
              {/* OnChange passes in an event callback. It says: "when this runs, call this other function (our updated markdown). */}
              {/* And within that we want to pass in: "event.target.value", which is the content which is inside our text area.   */}
              {/* componentClass="textarea" doesn't work here because it is just one line, therefor I used "as="textarea"" */}
              <FormControl as="textarea" id="editor" className="border border-primary" placeholder="Enter Markdown here" value={markdown} onChange={(e) => this.updateMarkdown(e.target.value)}></FormControl>

            </FormGroup>
          </Col>

          <Col>
            <FormLabel className="title"><h2>Previewer</h2></FormLabel>
            {/* <output id="preview">this should later show the state of the app</output> */}
            {/* The way you convert Markdown into HTML is by passing it into marked (which then utilizes the library) */}
            {/* React documentation: "dangerouslySetInnerHTML is React’s replacement for using innerHTML in the browser DOM. In general, setting HTML from code is risky
       because it’s easy to inadvertently expose your users to a cross-site scripting (XSS) attack. So, you can set HTML directly from React,
       but you have to type out dangerouslySetInnerHTML and pass an object with a __html key, to remind yourself that it’s dangerous."" */}
            {/* For the optional bonus test (interpret carriage returns and render them as <br>): normally you use marked(text to apply the markdown on),
       but to also convert breaks you have to add ",{breaks:true}" to adapt the setting. See documentation: https://marked.js.org/#/USING_ADVANCED.md#options*/}
            <div dangerouslySetInnerHTML={{ __html: marked(markdown, { breaks: true }) }} id="preview" className="border border-primary"></div>
          </Col>
          
        </Row>
        <div class="text-dark">
         {/* Haven't heard of "tab-nabbing" risk, but now will add "rel="noopener noreferrer"" to links (as recommended here: https://mathiasbynens.github.io/rel-noopener/) */}
      <div class="footer"> by <a class="text-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/Gerard-B/">Gerard</a></div>
    </div>
         
      </div>
    );
  }
}

export default App;
