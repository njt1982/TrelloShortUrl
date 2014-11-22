(function() {

  (function() {
    var TrelloShortUrl;

    TrelloShortUrl = (function() {
      function TrelloShortUrl(config) {
        this.config = config;
        this.actionSelector = ".other-actions .clearfix";
        this.listen();
      }

      TrelloShortUrl.prototype.listen = function() {
        return window.addEventListener("message", (function(_this) {
          return function(event) {
            if (event.data.trelloUrlChanged === null) {
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

        var actions, icon;
        actions = document.querySelector(this.actionSelector);

        this.button = document.createElement("a");
        this.button.className = "button-link js-add-trello-short-url";
        this.button.setAttribute("id", "trello-short-url-button");
        this.button.setAttribute("title", "Copy the short URL for this card to the clipboad");
        this.button.dataset.cardId = cardId;

        icon = document.createElement("span");
        icon.className = "icon-sm icon-card";
        this.button.appendChild(icon);
        this.button.appendChild(document.createTextNode(" Short URL"));
        this.button.addEventListener("click", this.buttonClick);

        return actions.insertBefore(this.button, actions.children[0]);
      };

      TrelloShortUrl.prototype.buttonClick = function(event) {
        var _target = event.target;

        cardId = _target.dataset.cardId;

        var t = document.createElement('input');
        t.setAttribute('type', 'text');
        t.value = 'https://trello.com/c/' + cardId;
        _target.appendChild(t);
        t.focus();
        t.select();
        document.execCommand('Copy', false, null);
        t.remove();
      };

      return TrelloShortUrl;
    })();

    return new TrelloShortUrl({});
  })();

}).call(this);
