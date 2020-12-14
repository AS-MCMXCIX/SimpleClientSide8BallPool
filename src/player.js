class Player {
    constructor(name, avatar) {
        this.name = name;
        this.avatar = avatar;
        this.scoredBalls = [];
        this._ballGroup = null;
    }

    set ballGroup(bg) {
        this._ballGroup = bg;
    }

    get ballGroup() {
        return this._ballGroup;
    }

    score(num) {
        this.scoredBalls.push(num);
    }

    canHit(ballNum) {
        if (this.ballGroup !== null) {
            return (
                ballNum === 8 && this.scoredBalls.length === 7 ||
                ballNum < 8 && this.ballGroup === SOLID ||
                ballNum > 8 && this.ballGroup === STRIPES
            );
        }
        return true;
    }

    reset() {
        this.scoredBalls = [];
        this.ballGroup = null;
    }
}