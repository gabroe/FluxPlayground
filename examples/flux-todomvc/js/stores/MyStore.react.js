var React = require('react');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');
var CHANGE_EVENT = 'change';

var MyStore = assign({}, EventEmitter.prototype, {

    _widgetCreated : false,

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var text;

    if(!MyStore._widgetCreated){
        //$('<div>') can be used but using createElement is the fastest way to insert a div
        var pp = $(document.createElement('div')),
            WidgetWithPopup = require('../components/WidgetWithPopup.react');
        $('body').append(pp);
        React.render(
            <WidgetWithPopup/>,
            pp[0]
        );
        MyStore._widgetCreated = true;
    }

    switch(action.actionType) {
        case "togglePopup":
            MyStore.show = action.props.show;
            MyStore.anchor = action.props.anchor;
            MyStore.offset = action.props.offset;
            MyStore.emitChange();
            break;

        case "showPopup":
            MyStore.show = true;
            MyStore.anchor = action.props.anchor;
            MyStore.offset = action.props.offset;
            MyStore.emitChange();
            break;

        case "hidePopup":
            MyStore.show = false;
            MyStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = MyStore;