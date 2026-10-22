// Stripe Math engine: the stalls a row takes, the bays a lot takes, the paint line a row takes, and the paint a line takes. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the tape and the paint can.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _HGT = "the wall height must be from 1 to 240 inches with no decimal places";
var _LEN = "the length must be from 1 to 100000 ft with no decimal places";
var _SW = "the stall width must be from 1 to 30 ft with no decimal places";
var _SL = "the stall length must be from 1 to 60 ft with no decimal places";
var _AI = "the aisle width must be from 1 to 100 ft with no decimal places";
var _ST = "the stall count must be from 1 to 100000 with no decimal places";
var _LW = "the line width must be from 1 to 48 inches with no decimal places";
var _COV = "the coverage must be from 1 to 10000 sq ft a gallon with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }
function _pl(n, one, many) { return n + (n === 1 ? one : many); }

function stallsTruth(rowft, stallw) {
  var r = _i(rowft, _LEN, 6, 1, 100000), w = _i(stallw, _SW, 2, 1, 30);
  var n = Math.floor(r / w), left = r - n * w;
  return "A row of " + r + " ft with stalls " + w + " ft wide fits " + _pl(n, " stall", " stalls") + ", leaving " + left + " ft.";
}
function bayTruth(depthft, stalll, aisle) {
  var d = _i(depthft, _LEN, 6, 1, 100000), s = _i(stalll, _SL, 2, 1, 60), a = _i(aisle, _AI, 3, 1, 100);
  var bay = 2 * s + a, n = Math.floor(d / bay), left = d - n * bay;
  return "Two rows of " + s + " ft stalls and a " + a + " ft aisle make a " + bay + " ft bay, and a lot " + d + " ft deep fits " + _pl(n, " bay", " bays") + ", leaving " + left + " ft.";
}
function lineTruth(stalls, stalll) {
  var n = _i(stalls, _ST, 6, 1, 100000), s = _i(stalll, _SL, 2, 1, 60);
  return "The " + _pl(n, " stall", " stalls") + " in a row take " + _pl(n + 1, " line", " lines") + " of " + s + " ft, " + ((n + 1) * s) + " ft of paint line.";
}
function paintTruth(lineft, widin, cov, price) {
  var l = _i(lineft, _LEN, 6, 1, 100000), w = _i(widin, _LW, 2, 1, 48), c = _i(cov, _COV, 5, 1, 10000), p = _p(price, _PRICE, 5, 2, 1, 1000000);
  var gal = Math.floor((l * w + 12 * c - 1) / (12 * c)), area = _hu(l * w * 100, 12);
  return "The " + l + " ft of line at " + w + " inches wide covers " + _dec(area, 2) + " sq ft, takes " + _pl(gal, " gallon", " gallons") + " at " + c + " sq ft a gallon, and costs $" + _money(gal * p) + ".";
}
