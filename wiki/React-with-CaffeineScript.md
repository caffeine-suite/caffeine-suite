[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

Related: [Declarative Programming](./Declarative-Programming.md)

CaffeineScript is ideal for React-style programming.


## Facebook React

Writing React code is cleaner in CaffeineScript. Here is an example from the [Facebook React Examples](https://facebook.github.io/react/).

```coffeescript
# CaffeineScript - 43 tokens, 2 matching-pairs, 1 language
class Timer extends Component
  constructor: ->
    @state = secondsElapsed: 0

  componentDidMount: ->
    @interval = setInterval 
      -> @setState (prevState) -> 
        secondsElapsed: prevState.secondsElapsed + 1      
      1000

  componentWillUnmount: ->
    clearInterval @interval

  render: ->
    Div "" Seconds Elapsed: #{@state.secondsElapsed}

render Timer, mountNode
```
versus
```jsx
// JSX - 114 tokens, 18 matching-pairs, 2 languages
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {secondsElapsed: 0};
  }

  tick() {
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
}

ReactDOM.render(<Timer />, mountNode);
```

#### Completing the Example with Style

The Facebook example above isn't complete. It doesn't include any import statements and it doesn't define mountNode. In CaffeineScript, importing the React libraries AND completely replacing JSX can be done with one line of code and one tiny library:

```coffeescript
import &react, &reactdom, &ReactDomFactories
```

```coffeescript
# ReactDomFactories.caf - reusable lib
&ArtObjectTreeFactory.createObjectTreeFactories
  :div :span
  (type, props, children) -> createElement type, props, children...
```

I'm not sure how they define mountNode, so we'd need another line or two for that.

## Art React

It should come as no surprise that if you are using my [ArtSuite](https://github.com/imikimi/art-suite/wiki) with [ArtReact](https://github.com/imikimi/art-react/wiki), this same component is even leaner. 

```coffeescript
# CaffeineScript + ArtSuite: 37 tokens, 1 matching pair
import &ArtSuite

initArtSuiteApp MainComponent: class Timer extends Component
  @stateFields secondsElapsed: 0

  componentDidMount: ->
    @interval = setInterval 
      -> @secondsElapsed += 1
      1000

  componentWillUnmount: ->
    clearInterval @interval

  render: ->
    CanvasElement
      RectangleElement color: #eee
      TextElement text: "" Seconds Elapsed: #{@secondsElapsed}
```

Notes:
* This is a complete, stand alone, runnable example, unlike the incomplete Facebook example. All you need is to bundle it with webpack and run it in a browser.
* ArtSuite is a Canvas-App system. It does not use the DOM.
