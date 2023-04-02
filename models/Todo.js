class Todo {
  constructor(text, date, status) {
    this._text = text;
    this._date = date;
    this._status = status;
  }

  get text() {
    return this._text;
  }

  set text(text) {
    this._text = text;
  }

  get date() {
    return this._date;
  }

  set date(date) {
    this._date = date;
  }

  get status() {
    return this._status;
  }

  set status(status) {
    this._status = status;
  }
  toJSON() {
    return {
      text: this._text,
      date: this._date,
      status: this._status,
    };
  }
}

export default Todo;
