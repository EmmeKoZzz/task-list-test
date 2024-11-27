export class Watcher<T> {
	private oldVal: T[];
	private intervalId: number | undefined;

	private _isWatching: boolean = true;
	get isWatching() {
		return this._isWatching;
	}

	constructor(
		private prop: (() => T)[],
		private callback: (old: T[], val: T[]) => void,
		private timeout: number = 10) {
		this.oldVal = this.prop.map(p => p())
	}

	connect() {
		this.intervalId = setInterval(() => {
			const current = this.prop.map(p => p());
			if (this.oldVal.some((val, ix) => val !== current[ix])) {
				this.callback(this.oldVal, current);
				this.oldVal = current;
			}
		}, this.timeout)
		this._isWatching = true;
	}

	disconnect() {
		clearInterval(this.intervalId);
		this._isWatching = false;
	}
}