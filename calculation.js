const select = document.getElementById("select");
const go = document.getElementById("go");
const concurrency = document.getElementById("concurrency");
let selecting = null;

go.onclick = () => {
    const dim = select.value;
    if (dim !== '2D' && dim !== '3D' && dim != '4D') return;
    if (selecting) document.getElementById(selecting).setAttribute('hidden', '');
    document.getElementById(dim).removeAttribute('hidden');
    selecting = dim;
}

const dp = {};
const dpc = {};

function count2(a, b) {
    if (a < 0n || b < 0n) return 0n;
    const prob = dp[`${a},${b}`];
    if (prob !== undefined) return prob;
    return dp[`${a},${b}`] = 1n + count2(a - 1n, b) + count2(a, b - 1n);
}

function count2C(a, b) {
    if (a < 0n || b < 0n) return 0n;
    const prob = dpc[`${a},${b}`];
    if (prob !== undefined) return prob;
    return dpc[`${a},${b}`] = 1n + count2C(a - 1n, b) + count2C(a - 1n, b - 1n) + count2C(a, b - 1n);
}

function count3(a, b, c) {
    if (a < 0n || b < 0n || c < 0n) return 0n;
    const prob = dp[`${a},${b},${c}`];
    if (prob !== undefined) return prob;
    return dp[`${a},${b},${c}`] = 1n + count3(a - 1n, b, c) + count3(a, b - 1n, c) + count3(a, b, c - 1n);
}

function count3C(a, b, c) {
    if (a < 0n || b < 0n || c < 0n) return 0n;
    const prob = dpc[`${a},${b},${c}`];
    if (prob !== undefined) return prob;
    return dpc[`${a},${b},${c}`] = 1n + count3C(a - 1n, b, c) + count3C(a, b - 1n, c) + count3C(a, b, c - 1n) + 
                                        count3C(a - 1n, b - 1n, c) + count3C(a - 1n, b, c - 1n) + count3C(a, b - 1n, c - 1n) + 
                                        count3C(a - 1n, b - 1n, c - 1n);
}

function count4(a, b, c, d) {
    if (a < 0n || b < 0n || c < 0n || d < 0n) return 0n;
    const prob = dp[`${a},${b},${c},${d}`];
    if (prob !== undefined) return prob;
    return dp[`${a},${b},${c},${d}`] = 1n + count4(a - 1n, b, c, d) + count4(a, b - 1n, c, d) + count4(a, b, c - 1n, d) + count4(a, b, c, d - 1n);
}

function count4C(a, b, c, d) {
    if (a < 0n || b < 0n || c < 0n || d < 0n) return 0n;
    const prob = dpc[`${a},${b},${c},${d}`];
    if (prob !== undefined) return prob;
    return dpc[`${a},${b},${c},${d}`] = 1n + count4C(a - 1n, b, c, d) + count4C(a, b - 1n, c, d) + count4C(a, b, c - 1n, d) + count4C(a, b, c, d - 1n) + 
                                        count4C(a - 1n, b - 1n, c, d) + count4C(a - 1n, b, c - 1n, d) + count4C(a - 1n, b, c, d - 1n) +
                                        count4C(a, b - 1n, c - 1n, d) + count4C(a, b - 1n, c, d - 1n) + count4C(a, b, c - 1n, d - 1n) + 
                                        count4C(a - 1n, b - 1n, c - 1n, d) + count4C(a - 1n, b - 1n, c, d - 1n) + count4C(a - 1n, b, c - 1n, d - 1n) + 
                                        count4C(a, b - 1n, c - 1n, d - 1n) + count4C(a - 1n, b - 1n, c - 1n, d - 1n);
}

function solve2D() {
    const [a, b] = ['2Da', '2Db'].map(v => BigInt(parseInt(document.getElementById(v).value)));
    document.getElementById('2Dresult').innerText = `Number of reachable sequences is: ${concurrency.checked ? count2C(a, b) : count2(a, b)}`;
}

function solve3D() {
    const [a, b, c] = ['3Da', '3Db', '3Dc'].map(v => BigInt(parseInt(document.getElementById(v).value)));
    document.getElementById('3Dresult').innerText = `Number of reachable sequences is: ${concurrency.checked ? count3C(a, b, c) : count3(a, b, c)}`;
}

function solve4D() {
    const [a, b, c, d] = ['4Da', '4Db', '4Dc', '4Dd'].map(v => BigInt(parseInt(document.getElementById(v).value)));
    document.getElementById('4Dresult').innerText = `Number of reachable sequences is: ${concurrency.checked ? count4C(a, b, c, d) : count4(a, b, c, d)}`;
}