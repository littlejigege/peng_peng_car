window.onload = function () {
    const snake = document.getElementById('snake');
    let deg = 0;
    const F = 1.5;
    let deltdeg = 5;
    const fn = 1;
    let f = 0;
    const m = 5;
    const a = (f - fn) / m
    let v = 0;
    let vx = 0;
    let vy = 0;
    let x = 400 -50;
    let y = 800 - 50;

    let xCenterTop = x + 25;
    let yCenterTop = y;
    let xCenterBottom = x + 25;
    let yCenterBottom = y + 50;

    const canvas = document.getElementById("canvas");
    canvas.setAttribute('width', 800);
    canvas.setAttribute('height', 800);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";


    setInterval(function () {
        let fnx = Math.cos(Math.atan2(vy, vx)) * fn
        let fny = Math.sin(Math.atan2(vy, vx)) * fn
        if (Math.abs(fnx) == fn) {
            fny = 0;
        } else if (Math.abs(fny) == fn) {
            fnx = 0;
        }
        fnx = Math.abs(fnx);
        fny = Math.abs(fny);

        let fx = Math.cos((deg - 90) * Math.PI / 180) * f
        let fy = Math.sin((deg - 90) * Math.PI / 180) * f
        if (Math.abs(fx) == F) {
            fy = 0;
        } else if (Math.abs(fy) == F) {
            fx = 0;
        }


        let vxt = calV(fx, fnx, vx)
        let vyt = calV(fy, fny, vy)
        vx = vxt;
        vy = vyt;
        move(vxt, vyt)
    }, 16.6)

    function calV(f, fn, v) {
        if (f === 0) {
            if (v !== 0) {
                if (Math.abs(v) - fn / m <= 0) {
                    v = 0;
                } else {
                    if (v < 0) {
                        v += fn / m
                    } else {
                        v -= fn / m
                    }
                }
            }
        } else {
            if (f > 0) {
                if (v >= 0) {
                    v += (f - fn) / m
                } else {
                    v += (f + fn) / m
                }

            } else {
                if (v >= 0) {
                    v += (f - fn) / m
                } else {
                    v += (f + fn) / m
                }
            }

        }

        return v;
    }

    function rotate(delt) {
        deg += delt;
        snake.style.transform = `rotate(${deg}deg)`
    }

    function move(dx, dy) {
        if (dx + x > 750 || dx + x < 0) {
            vx = -vx 
            dx = 0;
        }
        if (dy + y > 750 || dy + y < 0) {
            vy = -vy 
            dy = 0;
        }

        if (Math.abs(Math.floor(Math.atan2(vy, vx) * (180 / Math.PI) - 90) - deg) % 180 > 30) {
            ctx.moveTo(xCenterTop, yCenterTop)
            ctx.lineTo(xCenterTop + dx, yCenterTop + dy)
            ctx.stroke()

            ctx.moveTo(xCenterBottom, yCenterBottom)
            ctx.lineTo(xCenterBottom + dx, yCenterBottom + dy)
            ctx.stroke()
        }
        x += dx;
        y += dy;

        xCenterTop += dx;
        yCenterTop += dy;

        xCenterBottom += dx;
        yCenterBottom += dy;
        snake.style.top = y + "px";
        snake.style.left = x + "px";
    }
    registerRightRotate()
    registerLeftRotate()
    registerForward()
    registerBackward()

    function registerRightRotate() {
        const button = document.getElementById('right-rotate')
        let interval;
        button.onmousedown = function () {
            interval = setInterval(function () {
                rotate(deltdeg)
            }, 16.6)

        }

        button.onmouseup = function () {
            clearInterval(interval)
        }

        button.onmouseout = function () {
            clearInterval(interval)
        }
    }

    function registerLeftRotate() {
        const button = document.getElementById('left-rotate')
        let interval;
        button.onmousedown = function () {
            interval = setInterval(function () {
                rotate(-deltdeg)
            }, 16.6)

        }

        button.onmouseup = function () {
            clearInterval(interval)
        }

        button.onmouseout = function () {
            clearInterval(interval)
        }
    }

    function registerForward() {
        const button = document.getElementById('forward')
        let interval;
        button.onmousedown = function () {
            f = F;

        }

        button.onmouseup = function () {
            f = 0;
        }

        button.onmouseout = function () {
            f = 0;
        }

    }

    function registerBackward() {
        const button = document.getElementById('backward')
        let interval;
        button.onmousedown = function () {
            f = -F;

        }

        button.onmouseup = function () {
            f = 0;
        }

        button.onmouseout = function () {
            f = 0;
        }

    }
    let rightRotateInterval;
    let leftRotateInterval;
    let forwardInterval;
    let backwardInterval;
    document.onkeydown = function (key) {
        switch (key.key) {
            case "d":
                if (!rightRotateInterval) {
                    rightRotateInterval = setInterval(function () {
                        if (f < 0) {
                            rotate(-deltdeg)
                        } else if (f > 0) {
                            rotate(deltdeg)
                        }
                    }, 16.6)
                }
                break;
            case "a":
                if (!leftRotateInterval) {
                    leftRotateInterval = setInterval(function () {
                        if (f < 0) {
                            rotate(deltdeg)
                        } else if (f > 0) {
                            rotate(-deltdeg)
                        }
                    }, 16.6)
                }
                break
            case "w":
                f = F;
                break
            case "s":
                f = -F;
                break
            default:
                break;
        }
    }

    document.onkeyup = function (key) {
        switch (key.key) {
            case "d":
                clearInterval(rightRotateInterval)
                rightRotateInterval = null
                break;
            case "a":
                clearInterval(leftRotateInterval)
                leftRotateInterval = null
                break
            case "w":
                f = 0;
                break;
            case "s":
                f = 0
                break
            default:
                break;
        }
    }

}