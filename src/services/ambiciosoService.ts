
export function getDiceNumber() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * 6) + 1);
        }, 1000);
    });
}