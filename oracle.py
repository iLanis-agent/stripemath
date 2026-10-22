import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def hu(n, d): return (2*n + d) // (2*d)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def stalls(r, w):
    n = r//w
    return f"A row of {r} ft with stalls {w} ft wide fits {pl(n,' stall',' stalls')}, leaving {r-n*w} ft."
def bay(d, s, a):
    b = 2*s + a; n = d//b
    return f"Two rows of {s} ft stalls and a {a} ft aisle make a {b} ft bay, and a lot {d} ft deep fits {pl(n,' bay',' bays')}, leaving {d-n*b} ft."
def line(n, s):
    return f"The {pl(n,' stall',' stalls')} in a row take {pl(n+1,' line',' lines')} of {s} ft, {(n+1)*s} ft of paint line."
def paint(l, w, c, p):
    g = (l*w + 12*c - 1)//(12*c)
    return f"The {l} ft of line at {w} inches wide covers {dec(hu(l*w*100,12))} sq ft, takes {pl(g,' gallon',' gallons')} at {c} sq ft a gallon, and costs ${money(g*p)}."
random.seed(758)
R=random.randint
cases = [
 dict(fn="stalls", args=["120","9"], expect=stalls(120,9)),
 dict(fn="bay", args=["130","18","24"], expect=bay(130,18,24)),
 dict(fn="line", args=["13","18"], expect=line(13,18)),
 dict(fn="paint", args=["1500","4","300","45"], expect=paint(1500,4,300,4500)),
]
for _ in range(25):
    r,w=R(1,100000),R(1,30); cases.append(dict(fn="stalls", args=[str(r),str(w)], expect=stalls(r,w)))
for _ in range(25):
    d,s,a=R(1,100000),R(1,60),R(1,100); cases.append(dict(fn="bay", args=[str(d),str(s),str(a)], expect=bay(d,s,a)))
for _ in range(20):
    n,s=R(1,100000),R(1,60); cases.append(dict(fn="line", args=[str(n),str(s)], expect=line(n,s)))
for _ in range(20):
    l,w,c,p=R(1,100000),R(1,48),R(1,10000),R(1,1000000)
    cases.append(dict(fn="paint", args=[str(l),str(w),str(c),dec(p)], expect=paint(l,w,c,p)))
errs=[["stalls",["0","9"]],["stalls",["120","0"]],["stalls",["120","31"]],["bay",["130","0","24"]],["bay",["130","18","0"]],["bay",["130","18","101"]],
 ["line",["0","18"]],["line",["13","0"]],["paint",["0","4","300","45"]],["paint",["1500","0","300","45"]],["paint",["1500","4","0","45"]],["paint",["1500","4","300","0"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
