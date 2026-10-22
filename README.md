# Stripe Math

Parking lot stripe arithmetic. A row of 120 ft with stalls 9 ft wide fits 13 stalls, leaving 3 ft.

## What it computes

- **The stalls truth** - stalls: the row length (1 to 100000 ft) divided by the stall width (1 to 30 ft), rounded down, with the feet left.
- **The bays truth** - bays: the lot depth divided by two stall lengths (1 to 60 ft) plus the aisle (1 to 100 ft), rounded down, with the feet left.
- **The lines truth** - lines: one more than the stalls (1 to 100000), each as long as a stall, and the feet of paint line.
- **The paint truth** - paint: the line feet times the width (1 to 48 inches), over the coverage (1 to 10000 sq ft a gallon), rounded up to whole gallons, and the cost at the price a gallon.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any lot and does not know the local code, accessible-space rules, fire lanes or traffic flow, and it gives no verdict that a layout is legal, safe or approved. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/stripemath/
Repo: https://github.com/iLanis-agent/stripemath
