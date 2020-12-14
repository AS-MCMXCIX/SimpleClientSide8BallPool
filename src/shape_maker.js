class ShapeMaker {
    static createCueBall(R, x, y) {
        let outerCircle = new Path.Circle(new Point(x, y), R);
        outerCircle.fillColor = 'white';
        let group = new Group();
        group.addChild(outerCircle);
        return group;
    }

    static createSolidBall(R, x, y, number) {
        let fillColor = ballsColorMeta[number];
        let outerCircle = new Path.Circle(new Point(x, y), R);
        outerCircle.fillColor = fillColor;
        let innerCircle = new Path.Circle(new Point(x, y), R / 2);
        innerCircle.fillColor = 'white';
        let txt = new PointText(outerCircle.position);
        txt.style = {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 0.65 * R,
            fillColor: 'black',
            justification: 'center'
        };
        txt.content = number.toString();
        txt.position.y += txt.bounds.height / 4;
        let group = new Group();
        group.addChildren([outerCircle, innerCircle, txt]);
        return group;
    }

    static createStripesBall(R, x, y, number) {
        let fillColor = ballsColorMeta[number];
        let d = R / 10;
        let r = R / 2;
        let dy = r + d;
        let dx = (R * R - dy * dy) ** 0.5;

        let x1 = new Point(x - dx, y - dy);
        let x2 = new Point(x + dx, y - dy);
        let x3 = new Point(x + dx, y + dy);
        let x4 = new Point(x - dx, y + dy);
        let through1 = new Point(x + R, y);
        let through2 = new Point(x - R, y);

        let outerCircle = new Path.Circle(new Point(x, y), R + R / 250);
        outerCircle.fillColor = 'white';


        let path = Path.Line(x1, x2);
        path.arcTo(through1, x3);
        path.add(x4);
        path.arcTo(through2, x1);
        path.strokeColor = fillColor;
        path.fillColor = fillColor;


        let innerCircle = new Path.Circle(new Point(x, y), r);
        innerCircle.fillColor = 'white';

        let txt = new PointText(outerCircle.position);
        txt.style = {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 0.65 * R,
            fillColor: 'black',
            justification: 'center',
            backgroundColor: 'red'
        };
        txt.content = number.toString();
        txt.position.y += txt.bounds.height / 4;

        let group = new Group();
        group.addChildren([outerCircle, path, innerCircle, txt]);
        return group;
    }

    static createBallsContainer(R, x, y) {
        let path = new Path();
        let p0 = new Point(x, y);
        let i = new Point(1, 0);
        let j = new Point(0, 1);
        let r2 = (2 ** 0.5);
        let r3 = (3 ** 0.5);
        let cos15 = Math.cos(Math.PI / 12);
        let sin15 = Math.sin(Math.PI / 12);
        //path.add(p0);
        //path.arcTo(p0 + i * R * r2 / 2 + j * R * (1 - r2 / 2), p0 + i * R + j * R);
        path.add(p0 + i * R + j * R);
        path.arcTo(p0 + i * R * cos15 + j * R * (1 + sin15), p0 + i * R * r3 / 2 + j * R * 1.5);
        path.arcTo(p0 + i * R * (r3 - cos15) + j * R * (2 - sin15), p0 + i * R * (r3 - 1) + j * R * 2);
        path.arcTo(p0 + i * R * (r3 - cos15) + j * R * (2 + sin15), p0 + i * R * r3 / 2 + j * R * 2.5);
        path.arcTo(p0 + i * R * (cos15) + j * R * (3 - sin15), p0 + i * R + j * 3 * R);
        //path.arcTo(p0 + i * R * cos15 + j * R * (1 + sin15), p0 + i * R * r3 / 2 + j * R * 1.5);
        path.strokeColor = 'white';
        path.fillColor = 'blue';

        let cap = new Path.Arc(p0 - i * R + j * R, p0, p0 + i * R + j * R);
        cap.strokeColor = 'white';
        cap.fillColor = 'blue';

        let bot = cap.clone();
        bot.rotate(180);
        bot.position.y += 15 * R;

        let right = new Path();
        right.fillColor = 'blue';
        right.strokeColor = 'white';
        right.strokeWidth = 2;
        right.join(cap);
        right.join(path.clone());
        for (let k = 0; k < 6; k++) {
            let c = path.clone();
            c.position.y += 2 * R * (k + 1);
            right.join(c);
        }
        path.remove();
        right.join(bot);
        for (let k = 0; k < 7; k++) {
            let d = path.clone();
            d.rotate(180);
            d.position.x -= 2 * R;
            d.position.x += d.bounds.width;
            d.position.y += 2 * R * (6 - k);
            right.join(d);
        }
        return right;
    }

    static createWall(x, y, h, w, r, hr) {
        let tl;
        let g = new Group();
        tl = new Path.Line(new Point(x + hr, y), new Point(x - hr + w / 2, y));
        tl.fillColor = '#05d237';
        tl.add(new Point(x - hr + w / 2 - r, y + r));
        tl.add(new Point(x + hr + r, y + r));
        let s = new Symbol(tl);
        let placed = s.place(new Point(0.25 * w + x, y + r / 2));
        g.addChild(placed);
        // g.push(placed);
        placed = s.place(new Point(0.25 * w + x, y + h - r / 2)).rotate(180);
        g.addChild(placed);
        // g.push(placed);
        placed = s.place(new Point(0.75 * w + x, y + r / 2));
        g.addChild(placed);
        // g.push(placed);
        placed = s.place(new Point(0.75 * w + x, y + h - r / 2)).rotate(180);
        g.addChild(placed);
        // g.push(placed);
        placed = s.place(new Point(x + r / 2, y + h / 2)).rotate(270);
        g.addChild(placed);
        // g.push(placed);
        placed = s.place(new Point(w - r / 2 + x, y + h / 2)).rotate(90);
        g.addChild(placed);
        // g.push(placed);

        tl.remove();
        return g;
    }

    static createTableBorderPattern(x, y, h, fill) {
        let p0 = new Point(x, y);
        let p1 = new Point(x + h / 3, y);
        let p2 = new Point(x + h / 6, y + h / 2);
        let p_mid = (p0 + p1 + p2) / 3;
        let i = new Point(1, 0);
        let j = new Point(0, 1);
        let tri1 = new Path(p0);
        tri1.strokeWidth = h / 120;
        tri1.add(p1);
        tri1.add(p2);
        tri1.add(p0);
        tri1.add(p_mid);
        tri1.add(p1);
        tri1.add(p_mid);
        tri1.add(p2);

        tri1.add((p2 + p_mid + p0) / 3);
        tri1.add(p_mid);
        tri1.add((p2 + p_mid + p0) / 3);
        tri1.add(p0);

        tri1.add((p0 + p_mid + p1) / 3);
        tri1.add(p_mid);
        tri1.add((p0 + p_mid + p1) / 3);
        tri1.add(p1);

        tri1.add((p1 + p_mid + p2) / 3);
        tri1.add(p_mid);
        tri1.add((p1 + p_mid + p2) / 3);
        tri1.add(p2);

        tri1.strokeColor = fill;
        tri1.strokeCap = 'butt';
        tri1.strokeJoin = 'round';

        let tri2 = tri1.clone();
        tri2.position += i * h / 3;

        let tri3 = tri1.clone();
        tri3.rotate(180, p2);
        let tri4 = tri3.clone();
        tri4.position += i * h / 3;

        let pt1 = new Point(x + h / 3, y + h / 2 - ((10 ** 0.5 - 1) / 18) * h);
        let pt2 = new Point(x + h / 3, y + h / 2 + ((10 ** 0.5 - 1) / 18) * h);

        let topArc = new Path.Arc(p2, pt1, p2 + i * h / 3);
        let botArc = new Path.Arc(p2 + i * h / 3, pt2, p2);
        topArc.strokeWidth = h / 120;
        botArc.strokeWidth = h / 120;
        topArc.strokeColor = fill;
        botArc.strokeColor = fill;

        let daLeftMid = topArc.clone().join(botArc.clone()).scale(0.5, p2);
        let daRightMid = topArc.clone().join(botArc.clone()).scale(0.5, (p2 + i * h / 3));
        let lEye = new Path.Circle(p2 + i * h / 12, h / 60);
        lEye.fillColor = fill;
        let rEye = lEye.clone();
        rEye.position += i * h / 6;

        let vLine = new Path.Line(p1, p1 + j * h);
        vLine.strokeWidth = h / 120;
        vLine.strokeColor = fill;

        let rightSinArc = topArc.clone()
        rightSinArc.scale(0.5, p2 + i * 2 * h / 3);
        let leftSinArc = botArc.clone();
        leftSinArc.scale(0.5, p2 - i * h / 3);

        let g = new Group();
        g.addChildren([tri1, tri2, tri3, tri4, topArc, botArc, daLeftMid,
            daRightMid, lEye, rEye, vLine, leftSinArc, rightSinArc]);
        return g;
    }

    static createTable(x, y, w) {
        let h = w / 2;
        let railWidth = 0.02 * w;
        let pocketRadius = 0.0333 * w;
        let outerWidth = 0.05 * w;

        let back = new Path.Rectangle(new Point(x, y), w, h);
        let group = new Group();
        back.fillColor = {
            gradient: {
                stops: [['#009e17', 0.01], ['#008127', 0.9]],
                radial: true
            },
            origin: back.position,
            destination: back.bounds.rightCenter
        };
        group.addChild(back);

        let outer = new Path.Rectangle(new Rectangle(new Point(x - outerWidth, y - outerWidth), w + 2 * outerWidth, h + 2 * outerWidth), outerWidth / 2);
        outer.fillColor = '#8d5226';
        outer.strokeJoin = 'round';
        group.addChild(outer);

        let quad = ShapeMaker.createCornerQuad(x - outerWidth, y - outerWidth, outerWidth + pocketRadius, outerWidth / 2, pocketRadius);
        let sQuad = new Symbol(quad);

        let placed;
        placed = sQuad.place(new Point(x - (outerWidth - pocketRadius) / 2, y - (outerWidth - pocketRadius) / 2));
        group.addChild(placed);
        placed = sQuad.place(new Point(x + w + (outerWidth - pocketRadius) / 2, y - (outerWidth - pocketRadius) / 2));
        placed.rotate(90);
        group.addChild(placed);
        placed = sQuad.place(new Point(x - (outerWidth - pocketRadius) / 2, y + h + (outerWidth - pocketRadius) / 2));
        placed.rotate(-90);
        group.addChild(placed);
        placed = sQuad.place(new Point(x + w + (outerWidth - pocketRadius) / 2, y + h + (outerWidth - pocketRadius) / 2));
        placed.rotate(180);
        group.addChild(placed);

        ShapeMaker.createWall(x, y, h, w, railWidth, pocketRadius).addTo(group);
        group.addChild(placed);
        //arr.remove();
        outer.sendToBack();

        let g = ShapeMaker.createTableBorderPattern(x + pocketRadius, y - outerWidth, outerWidth, 'black');
        let diamond = new Symbol(g);
        g.remove();

        let num = Math.round((w - 2 * pocketRadius) * 3 / (2 * outerWidth));
        let x0 = x + (w - num * 2 * outerWidth / 3) / 2 + outerWidth / 3;
        for (let i = 0; i < num; i++) {
            group.addChild(diamond.place(new Point(x0 + ((2 * outerWidth / 3) * i), y - outerWidth / 2)));
            group.addChild(diamond.place(new Point(x0 + ((2 * outerWidth / 3) * i), y + h + outerWidth / 2)));
        }
        num = Math.round((h - 2 * pocketRadius) * 3 / (2 * outerWidth));
        for (let i = 0; i < num; i++) {
            placed = diamond.place(new Point(x0 + ((2 * outerWidth / 3) * i), y - outerWidth / 2));
            placed.rotate(90, new Point(x, y))
            placed.position.x -= outerWidth;
            group.addChild(placed);
            placed = diamond.place(new Point(x0 + ((2 * outerWidth / 3) * i), y - outerWidth / 2));
            placed.rotate(90, new Point(x, y))
            placed.position.x += w;
            group.addChild(placed);
        }
        let pockets = [];
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 3; i++) {
                pockets.push(new Point(i * (w / 2) + x, j * (w / 2) + y));
            }
        }
        ShapeMaker.createPockets(x, y, w, pockets, pocketRadius).addTo(group);
        return group;
    }

    static createPockets(x, y, w, pockets, pocketRadius) {
        let group = new Group();
        let h = w / 2;
        let dy = 0;
        let dx = 0;
        let p0 = new Point(x + w, y + h) - new Point(0, h + dy);
        let h0 = new Path.Circle(p0, pocketRadius);
        h0.fillColor = 'black';
        let s = new Symbol(h0);
        h0.remove();
        for (let i = 0; i < 6; i++) {
            let c = s.place(pockets[i]);
            group.addChild(c);
        }
        return group;
    }

    static createCornerQuad(x, y, w, r, hr) {
        let quad = new Path();
        let p0 = new Point(x, y);
        let i = new Point(1, 0);
        let j = new Point(0, 1);
        let r2o2 = 2 ** 0.5 / 2;
        quad.add(p0 + j * w);
        quad.add(p0 + j * r);
        quad.arcTo(p0 - new Point((r2o2 - 1) * r, (r2o2 - 1) * r), p0 + i * r);
        quad.add(p0 + i * w);
        quad.add(p0 + j * (w - hr) + i * (w - hr));
        //quad.add(p0+j*w);
        quad.fillColor = '#A9A9A9';
        return quad;
    }

    static createStick(x0, y0, gripR) {
        let stick = new Group();

        let grip2R = 1.5 * gripR;
        let h1 = 0.75 * grip2R;


        let grip1 = new Path.Arc(new Point(x0, y0 - gripR), new Point(x0 - gripR, y0), new Point(x0, y0 + gripR));
        grip1.fillColor = '#412e07';

        let grip2 = new Path.Line(new Point(x0, y0 + gripR), new Point(x0, y0 - gripR));
        let deg = Math.PI / 3;
        grip2.join(new Path.Arc(new Point(x0, y0 - gripR), new Point(x0 + grip2R / 2, y0 - grip2R / 1.1),
            new Point(x0 + grip2R, y0 - grip2R)));
        grip2.join(new Path.Line(new Point(x0 + grip2R, y0 - grip2R), new Point(x0 + grip2R, y0 + grip2R)));
        grip2.join(new Path.Arc(new Point(x0 + grip2R, y0 + grip2R), new Point(x0 + grip2R / 2, y0 + grip2R / 1.1),
            new Point(x0, y0 + gripR)));
        grip2.fillColor = 'yellow';

        let len = grip2R * 45;

        let fx = function (x) {
            let m = -0.7 * grip2R / len;
            return m * x + grip2R;
        }

        let firstHalf = new Path.Line(new Point(x0 + grip2R, y0 + grip2R), new Point(x0 + grip2R, y0 - grip2R));
        firstHalf.join(new Path.Line(new Point(x0 + grip2R, y0 - grip2R), new Point(x0 + grip2R + len / 2, y0 - fx(len / 2))));
        firstHalf.join(new Path.Line(new Point(x0 + grip2R + len / 2, y0 - fx(len / 2)), new Point(x0 + grip2R + len / 2, y0 + fx(len / 2))))

        firstHalf.fillColor = 'black';

        let midStripeWidth = gripR;

        let midStripe = new Path.Line(new Point(x0 + grip2R + len / 2, y0 + fx(len / 2)), new Point(x0 + grip2R + len / 2, y0 - fx(len / 2)));
        midStripe.join(new Path.Line(new Point(x0 + grip2R + len / 2, y0 - fx(len / 2)),
            new Point(x0 + grip2R + len / 2 + midStripeWidth, y0 - fx(len / 2 + midStripeWidth))));
        midStripe.join(new Path.Line(new Point(x0 + grip2R + len / 2 + midStripeWidth, y0 - fx(len / 2 + midStripeWidth)),
            new Point(x0 + grip2R + len / 2 + midStripeWidth, y0 + fx(len / 2 + midStripeWidth))));
        midStripe.fillColor = 'yellow';

        let lastHalf = new Path.Line(new Point(x0 + grip2R + len / 2 + midStripeWidth, y0 + fx(len / 2 + midStripeWidth)),
            new Point(x0 + grip2R + len / 2 + midStripeWidth, y0 - fx(len / 2 + midStripeWidth)));
        lastHalf.join(new Path.Line(new Point(x0 + grip2R + len / 2 + midStripeWidth, y0 - fx(len / 2 + midStripeWidth)),
            new Point(x0 + grip2R + len, y0 - fx(len))));
        lastHalf.join(new Path.Line(new Point(x0 + grip2R + len, y0 - fx(len)), new Point(x0 + grip2R + len, y0 + fx(len))));
        lastHalf.fillColor = 'white';

        let tip = new Path.Arc(new Point(x0 + grip2R + len, y0 - fx(len)), new Point(x0 + grip2R + len + 0.75 * gripR, y0), new Point(x0 + grip2R + len, y0 + fx(len)));
        tip.join(new Path.Line(new Point(x0 + grip2R + len, y0 + fx(len)), new Point(x0 + grip2R + len, y0 - fx(len))));
        tip.fillColor = 'grey';

        stick.addChildren([grip1, grip2, firstHalf, midStripe, lastHalf, tip]);
        return stick;
    }
}


let r = 20;
let x = 20;
let y = 20;
let a = document.createElement("a");
let dt = 500;
let t = 0;

function qDownload(href, name) {
    setTimeout(() => download(href, name), t + dt);
    t += dt;
}

function download(href, name) {
    a.href = href;
    a.download = name;
    a.click();
}

function downloadBalls() {
    let ball = ShapeMaker.createCueBall(r, x, y);
    let raster = ball.rasterize(300);
    qDownload(raster.toDataURL(), "cue.png");
    for (let i = 1; i < 9; i++) {
        let ball = ShapeMaker.createSolidBall(r, x, y, i);
        let raster = ball.rasterize(300);
        qDownload(raster.toDataURL(), `solid${i}.png`);
    }
    for (let i = 9; i < 16; i++) {
        let ball = ShapeMaker.createStripesBall(r, x, y, i);
        let raster = ball.rasterize(300);
        console.log(i);
        qDownload(raster.toDataURL(), `stripes${i}.png`);
    }
}

class BallContainer {
    constructor(r, x, y) {
        this.r = r;
        this.x = x;
        this.y = y;
        let shape = new Raster('res/Table/ballContainer.png');
        shape.scale(this.r * 2.26 / shape.bounds.width);
        console.log(shape.bounds.height);
        shape.position += new Point(x, shape.bounds.height / 2 + r + y);
        this.ballsIn = 0;
        this.ballsNumbers = new Array(8);
        this.ballsShapes = new Array(8);
        this.shape = shape;
    }

    insertBall(num) {
        let shape = ImageLoader.loadBall(num);
        shape.scale(2 * this.r / shape.bounds.width)
        console.log(shape.bounds.width);
        shape.position.x = this.x;
        //let dh = (8 - this.ballsIn) * 2.26 * this.r;
        let dh = this.shape.bounds.height * 0.125 * (8 - this.ballsIn);
        shape.position.y = this.y + dh - 2;
        this.ballsNumbers[this.ballsIn] = num;
        this.ballsShapes[this.ballsIn] = shape;
        ++this.ballsIn;
    }

    removeBallAt(idx) {

    }

    clear() {
        for (let i = 0; i < this.ballsIn; i++) {
            this.ballsShapes[i].remove();
        }
        this.ballsIn = 0;
        this.ballsNumbers = new Array(8);
        this.ballsShapes = new Array(8);
    }
}

class ImageLoader {
    static loadBall(number) {
        if (number === 0) {
            return new Raster('res/balls/cue.png');
        } else if (number <= 8) {
            return new Raster(`res/balls/solid${number}.png`);
        } else if (number > 8 && number < 16) {
            return new Raster(`res/balls/stripes${number}.png`);
        }
        throw "wrong number";
    }
}

//let w=800;
//download(ShapeMaker.createTable(0.05 * w, 0.05 * w, w).rasterize(300).toDataURL(), "table.png");
//download(ShapeMaker.createStick(0, w * 1.5 / 100, w / 100).rasterize(300).toDataURL(), "stick.png");
//ShapeMaker.createBallsContainer(r, r*1.13, r*1.13+2, 2);
//download(ShapeMaker.createBallsContainer(r * 1.13, 0, 0).rasterize(300).toDataURL(), "ballContainer.png");
let bc = new BallContainer(20, 100, 100);
bc.insertBall(1);
bc.insertBall(1);
bc.insertBall(1);
bc.insertBall(1);
bc.insertBall(1);
bc.insertBall(1);