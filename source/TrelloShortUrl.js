(function() {


  var headID = document.getElementsByTagName("head")[0];         
  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.src = chrome.extension.getURL('urlchange.js');
  headID.appendChild(newScript);
  
  

  (function() {
    var TrelloShortUrl;

    TrelloShortUrl = (function() {
      function TrelloShortUrl(config) {
        this.config = config;
        this.actionSelectorPrimary  = ".window-sidebar .other-actions .u-clearfix";
        this.actionSelectorFallback = ".window-sidebar .window-module:first-child .u-clearfix";
        this.listen();
        (function (_this) {
			setTimeout(function () {
				_this.addButtonIfOnCard();
			}, 1000);
		})(this);
      }

      TrelloShortUrl.prototype.listen = function() {
        return window.addEventListener("message", (function(_this) {
          return function(event) {
            if (! event.data.trelloUrlChanged) {
              return;
            }
            return _this.addButtonIfOnCard();
          };
        })(this));
      };

      TrelloShortUrl.prototype.addButtonIfOnCard = function() {
        var c, cardId, _, _ref;
        _ref = window.location.pathname.split("/");
        c = _ref[1];
        cardId = _ref[2];

        if (!(c === "c" && (cardId !== null))) {
          return;
        }
        this.buildButton(cardId);
        return true;
      };

      TrelloShortUrl.prototype.buildButton = function(cardId) {
        var oldButton = document.getElementById('trello-short-url-button');
        if (oldButton !== null) {
          oldButton.remove();
        }

        var actions, icon, label;
        actions = document.querySelector(this.actionSelectorPrimary);
        if (actions == undefined) {
          actions = document.querySelector(this.actionSelectorFallback);
        }

        if (actions == null) {
          return;
        }

        this.button = document.createElement("a");
        this.button.className = "button-link js-add-trello-short-url";
        this.button.setAttribute("id", "trello-short-url-button");
        this.button.setAttribute("title", "Copy the short URL for this card to the clipboad");
        this.button.dataset.cardId = cardId;

        icon = document.createElement("span");
        icon.className = "icon-sm icon-card";
        this.button.appendChild(icon);
        this.button.addEventListener("click", this.buttonClick);

        label = document.createElement("span");
        label.className = "button-label";
        label.innerHTML = " Short URL";
        this.button.appendChild(label);

        return actions.insertBefore(this.button, actions.children[0]);
      };

      TrelloShortUrl.prototype.buttonClick = function(event) {
        var label = this.querySelector("span.button-label");
        label.innerHTML = " Copied...";

        cardId = this.dataset.cardId;

        var t = document.createElement('input');
        t.setAttribute('type', 'text');
        t.value = 'https://trello.com/c/' + cardId;
        this.appendChild(t);
        t.focus();
        t.select();
        document.execCommand('Copy', false, null);
        t.remove();

        setTimeout(function() { label.innerHTML = " Short URL"; }, 750);
      };

      return TrelloShortUrl;
    })();

    return new TrelloShortUrl({});
  })();

}).call(this);
