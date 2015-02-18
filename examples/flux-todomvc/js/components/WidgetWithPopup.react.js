var React = require('react');
var MyStore = require('../stores/MyStore.react');
var Dispatcher = require('../dispatcher/AppDispatcher');
var Popup = require('./Popup.react');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getState() {
    return {
        show : !!MyStore.show,
        anchor : MyStore.anchor,
        offset : MyStore.offset
    };
}

var WidgetWithPopup = React.createClass({

    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        MyStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        MyStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function() {
        var that = this;
        return (
            <Popup
                class = {"widgetWithPopup"}
                show = {getState().show}
                onClose = {this._onClose}
                anchor = {getState().anchor}
                offset = {getState().offset}
            >
                <div style={{
                    border : '1px solid red',
                    backgroundColor : "#ccc",
                    width : '100px',
                    height : '100px',
                    }}
                >Something here</div>
            </Popup>
        );
    },

    /**
     * Event handler for 'change' events coming from the TodoStore
     */
    _onChange: function() {
        this.setState(getState());
    },

    _onClose : function(){
        Dispatcher.dispatch({actionType : 'hidePopup'})
    }


});

module.exports = WidgetWithPopup;
