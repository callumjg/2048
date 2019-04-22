export const handleSwipe = (element, callback) => {
    const minDist = 10,
        minConstraintRatio = 0.25,
        minTime = 10;

    let startX, startY, startTime;

    element.addEventListener("touchstart", e => {
        const touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = e.timeStamp;
    });

    element.addEventListener("touchmove", e => {
        e.preventDefault();
    });

    element.addEventListener("touchend", e => {
        const touchObj = e.changedTouches[0],
            distX = touchObj.pageX - startX,
            distY = touchObj.pageY - startY,
            elapsedTime = e.timeStamp - startTime,
            xPlane = Math.abs(distX) > Math.abs(distY) ? true : false,
            constraintRatio = Math.abs(1 - Math.abs(distX) / Math.abs(distY));

        if (elapsedTime < minTime) return;

        if (
            xPlane &&
            Math.abs(distX) > minDist &&
            constraintRatio > minConstraintRatio
        )
            distX > 0 ? callback("right") : callback("left");

        if (
            !xPlane &&
            Math.abs(distY) > minDist &&
            constraintRatio > minConstraintRatio
        )
            distY > 0 ? callback("down") : callback("up");
    });
};
