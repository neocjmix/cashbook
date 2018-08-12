const sum = (a, b) => a + b;
const toNumber = value =>
    typeof value === "number"
        ? value
        : (value + "").replace(/[^\d]/g,"")*1 || 0;

export {sum, toNumber}