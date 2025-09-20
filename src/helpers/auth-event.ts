import EventEmitter from "node:events";

const eventAuth = new EventEmitter({ captureRejections: true });

export default eventAuth;