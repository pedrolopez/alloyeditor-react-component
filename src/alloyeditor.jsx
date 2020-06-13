import React, {Component} from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
const loadScript = require('load-script');

const scriptUrl = 'https://cdnjs.cloudflare.com/ajax/libs/alloyeditor/2.11.7/alloy-editor-all.min.js';

class AlloyEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isScriptLoaded: props.isScriptLoaded
        };

        this.mounted = false;
        this.loadEditor = this.loadEditor.bind(this);
    }

    componentDidMount() {
        this.mounted = true;

        if (!this.state.isScriptLoaded) {
            loadScript(this.props.scriptUrl, this.loadEditor);
        } else {
            this.loadEditor();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    isAlloyEditorLoaded() {
        return window.AlloyEditor;
    }
    
    loadEditor() {
        if (!this.mounted) {
            return; // we don't want to load to an unmounted component
        }

        this.setState({
            isScriptLoaded: true
        });


        if (!this.isAlloyEditorLoaded()) {
            console.error('AlloyEditor not loaded');
            return;
        }

        this.alloyEditor = window.AlloyEditor.appendTo(
            ReactDOM.findDOMNode(this),
            this.props.config,
            this.props.content
        );

        for (let event in this.props.events) {
            let eventHandler = this.props.events[event];
            this.alloyEditor.on(event, eventHandler);
        }

    }

    render() {
        return (
            <div className={this.props.className} />
        );
    }
}

AlloyEditor.defaultProps = {
    content: '',
    config: {},
    isScriptLoaded: false,
    scriptUrl: scriptUrl,
    className: '',
    events: {}
};

AlloyEditor.propTypes = {
    content: PropTypes.any,
    config: PropTypes.object,
    isScriptLoaded: PropTypes.bool,
    scriptUrl: PropTypes.string,
    className: PropTypes.string,
    events: PropTypes.object
};

export default AlloyEditor;