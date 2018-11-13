const ApplicationPolicy = require("./application");

module.exports = class ListPolicy extends ApplicationPolicy {

 // #2
  new() {
    return this._isMember();
  }

  create() {
    return this.new();
  }

 // #3
  edit() {
    return this._isOwner();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}
