const settings = require('electron-settings');
const window = {
    sizeLoaded: false,
    size: {
        width: 800,
        height: 600,
    },
    sizeValid: function(size) {
        return typeof(size.width !== 'undefined') && typeof(size.height !== 'undefined')
            && size.width >= 100 && size.height >= 100;
    },
    
    public: {
        get size() {
            if (!settings.has('window.size') || window.sizeLoaded) {
                return window.size;
            }

            const sizeFromSettings = settings.get('window.size');
            if (!window.sizeValid(sizeFromSettings)) {
                return window.size;
            }

            window.size = sizeFromSettings;
            return window.size;
        },
        set size(newSize) {
            if (!window.sizeValid(newSize))
                return;
            
            window.size = newSize;
            settings.set('window.size', window.size);
        },
        setSize: function(widthAndHeight) {
            if (typeof widthAndHeight === 'undefined' || widthAndHeight.length < 2) {
                return;
            }
            this.size = {
                width: widthAndHeight[0],
                height: widthAndHeight[1],
            };
        }
    }
}

module.exports = {
    window: window.public
}