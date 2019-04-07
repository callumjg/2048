export const handleSwipe = (element, callback) => {
    const minDist = 60,
        maxPerpendicularDist = 30,
        minTime = 170;

    let startX, startY, startTime, direction;

    element.addEventListener("touchstart", e => {
        e.preventDefault();

        const touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = e.timeStamp;
        direction = null;
    });

    element.addEventListener("touchmove", e => {
        e.preventDefault();
    });

    element.addEventListener("touchend", e => {
        e.preventDefault();
        const touchObj = e.changedTouches[0],
            distX = touchObj.pageX - startX,
            distY = touchObj.pageY - startY,
            elapsedTime = e.timeStamp - startTime,
            xPlane = Math.abs(distX) > Math.abs(distY) ? true : false;

        if (elapsedTime < minTime) return;
        if (
            xPlane &&
            Math.abs(distX) > minDist &&
            Math.abs(distY) < maxPerpendicularDist
        )
            distX > 0 ? callback("right") : callback("left");

        if (
            !xPlane &&
            Math.abs(distY) > minDist &&
            Math.abs(distX) < maxPerpendicularDist
        )
            distY > 0 ? callback("down") : callback("up");
    });
};
