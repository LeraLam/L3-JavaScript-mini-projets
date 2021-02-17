const UP = Symbol('UP');
const DOWN = Symbol('DOWN');
const NONE = Symbol('NONE');

export default class MoveState {
  static get UP() { return UP; }
  static get DOWN() { return DOWN; }
  static get NONE() { return NONE; }
}