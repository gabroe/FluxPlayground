var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var MyStore = assign({}, EventEmitter.prototype, {

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
