function luckyDraw(player) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const win = Boolean(Math.round(Math.random()));

            process.nextTick(() => {
                if (win) {
                    resolve(`${player} won a prize in the draw!`);
                } else {
                    reject(new Error(`${player} lost the draw.`));
                }
            });
        }, 1000);
    });
}

const luckyDrawName = ["Joe", "Caroline", "Sabrina"];

const promises = luckyDrawName.map((name) => luckyDraw(name));

Promise.allSettled(promises)
    .then((results) => {
        results.forEach((res) => {
            if (res.status === "fulfilled") {
                console.log(res.value);
            } else {
                console.log(`${res.reason}`);
            };
        });
    })
    .catch((error) => {
        console.error("Error, the function is not read!", error)
    });