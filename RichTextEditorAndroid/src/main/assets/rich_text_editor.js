
var editor = {

    textField: document.getElementById('editor'),


    init: function() {
        this.textField.addEventListener("input", this.textChangedCallback);
        this.textField.addEventListener("click", this.updateCommandStates);
        this.textField.addEventListener("keyup", function(e) {
            var KEY_LEFT = 37, KEY_RIGHT = 39;
            if (e.which == KEY_LEFT || e.which == KEY_RIGHT) {
                editor.updateCommandStates(e);
            }
        });

        this.ensureEditorInsertsParagraphWhenPressingEnter();
    },

    ensureEditorInsertsParagraphWhenPressingEnter: function() {
        // see https://stackoverflow.com/a/36373967
        this._executeCommand("DefaultParagraphSeparator", "p");

        var newElement = document.createElement("p");
        newElement.innerHTML = "&#8203";
        this.textField.appendChild(newElement);

        var selection=document.getSelection();
        var range=document.createRange();
        range.setStart(newElement.firstChild, 1);
        selection.removeAllRanges();
        selection.addRange(range);
    },


    textChangedCallback: function() {
        window.location.href = "text-changed-callback://" + editor.getEncodedHtml();
    },


    getHtml: function() {
        return this.textField.innerHTML;
    },

    getEncodedHtml: function() {
        return encodeURI(this.getHtml());
    },

    setHtml: function(html) {
        this.textField.innerHTML = decodeURIComponent(html.replace(/\+/g, '%20'));
    },
    
    
    /*      Text Editor Commands        */

    undo: function() {
        this._executeCommand('undo', null);
    },
    
    redo: function() {
        this._executeCommand('redo', null);
    },
    
    setBold: function() {
        this._executeCommand('bold', null);
    },
    
    setItalic: function() {
        this._executeCommand('italic', null);
    },
    
    setSubscript: function() {
        this._executeCommand('subscript', null);
    },
    
    setSuperscript: function() {
        this._executeCommand('superscript', null);
    },
    
    setStrikeThrough: function() {
        this._executeCommand('strikeThrough', null);
    },
    
    setUnderline: function() {
        this._executeCommand('underline', null);
    },

    setBlockQuote: function() {
        this._executeCommand('formatBlock', '<blockquote>');
    },
    
    setJustifyLeft: function() {
        this._executeCommand('justifyLeft', null);
    },
    
    setJustifyCenter: function() {
        this._executeCommand('justifyCenter', null);
    },
    
    setJustifyRight: function() {
        this._executeCommand('justifyRight', null);
    },

    setJustifyFull: function() {
        this._executeCommand('justifyFull', null);
    },

    setIndent: function() {
        this._executeCommand('indent', null);
    },

    setOutdent: function() {
        this._executeCommand('outdent', null);
    },

    insertBulletList: function() {
        this._executeCommand('insertUnorderedList', null);
    },

    insertNumberedList: function() {
        this._executeCommand('insertOrderedList', null);
    },
    
    _executeCommand: function(command, parameter) {
        document.execCommand(command, false, parameter);
    },


    updateCommandStates: function(e) {
        var items = [];
        if (document.queryCommandState('undo')) {
            items.push('undo');
        }
        if (document.queryCommandState('redo')) {
            items.push('redo');
        }
        if (document.queryCommandState('bold')) {
            items.push('bold');
        }
        if (document.queryCommandState('italic')) {
            items.push('italic');
        }
        if (document.queryCommandState('underline')) {
            items.push('underline');
        }
        if (document.queryCommandState('subscript')) {
            items.push('subscript');
        }
        if (document.queryCommandState('superscript')) {
            items.push('superscript');
        }
        if (document.queryCommandState('strikeThrough')) {
            items.push('strikeThrough');
        }
        if (document.queryCommandState('indent')) {
            items.push('indent');
        }
        if (document.queryCommandState('indent')) {
            items.push('indent');
        }
        if (document.queryCommandState('outdent')) {
            items.push('outdent');
        }
        if (document.queryCommandState('justifyCenter')) {
            items.push('justifyCenter');
        }
        if (document.queryCommandState('justifyFull')) {
            items.push('justifyFull');
        }
        if (document.queryCommandState('justifyLeft')) {
            items.push('justifyLeft');
        }
        if (document.queryCommandState('justifyRight')) {
            items.push('justifyRight');
        }
        if (document.queryCommandState('insertOrderedList')) {
            items.push('orderedList');
        }
        if (document.queryCommandState('insertUnorderedList')) {
            items.push('unorderedList');
        }
        if (document.queryCommandState('insertHorizontalRule')) {
            items.push('horizontalRule');
        }
        var formatBlock = document.queryCommandValue('formatBlock');
        if (formatBlock.length > 0) {
            items.push(formatBlock);
        }

        window.location.href = "command-states-changed-callback://" + encodeURI(items.join(','));
    },

}


editor.init();