## alloyeditor-react-component

Component that integrates [AlloyEditor](https://alloyeditor.com/) with React js

## Installation

```
npm install alloyeditor-react-component
```

## Example

```js

class Example extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null,
        }
    }

  
    onChange(event){
      this.setState({
        content: event.editor.getData()
      })
    }
    
    render() {
        return (
            <AlloyEditor 
              content={this.state.content} 
              events={{
                "change": this.onChange
              }}
             className="my-editor"   
             />
        )
    }
}
```