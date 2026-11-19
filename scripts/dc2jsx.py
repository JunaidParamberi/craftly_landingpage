"""Convert the Landing3 .dc.html design into a Next.js client component + global CSS."""
import re, sys, json
from html.parser import HTMLParser

SRC, OUTDIR = sys.argv[1], sys.argv[2]
raw = open(SRC).read()

BLOBS = {
    "/_blob/157b69f699fe7694cc20be404c10a1a7": "/fonts/Chillax-Variable.woff2",
    "/_blob/743d1af1665c160f2bafa041f4fb2f43": "/assets/logo-mark.svg",
    "/_blob/efc2a2b17eecf2cd9d49a2072b584fbe": "/assets/logo-wordmark.svg",
    "/_blob/1656002b0d85c4322978091222ba37ce": "/media/craftlyai-film.mp4",
    "/_blob/3d0ae6b93c0f5ce92e56a89e459c63b5": "/media/craftlyai-film-poster.jpg",
}
for k, v in BLOBS.items():
    raw = raw.replace(k, v)
assert "/_blob/" not in raw

# ---- split pieces
helmet = raw[raw.index("<helmet>") + 8: raw.index("</helmet>")]
css = re.search(r"<style>(.*?)</style>", helmet, re.S).group(1)
body = raw[raw.index("</helmet>") + 9: raw.index("</x-dc>")]
script = re.search(r'<script type="text/x-dc"[^>]*>(.*?)</script>', raw, re.S).group(1)

css = css.replace("@media (max-width:760px){.nav-links{display:none}", "@media (max-width:760px){.nav-links{display:none!important}")
open(f"{OUTDIR}/globals.css", "w").write(css.strip() + "\n")

VOID = {"img", "br", "hr", "input", "meta", "link", "source", "path", "circle", "rect", "line", "polyline", "polygon", "stop", "ellipse"}
ATTR = {"class": "className", "for": "htmlFor", "tabindex": "tabIndex", "playsinline": "playsInline", "readonly": "readOnly",
        "maxlength": "maxLength", "viewbox": "viewBox", "crossorigin": "crossOrigin", "srcset": "srcSet", "autoplay": "autoPlay",
        "colspan": "colSpan", "rowspan": "rowSpan"}
BOOL = {"controls", "playsinline", "open", "disabled", "autoplay", "muted", "loop", "checked", "hidden"}

class Node:
    def __init__(self, tag, attrs):
        self.tag, self.attrs, self.kids = tag, attrs, []

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("root", []); self.stack = [self.root]
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs); self.stack[-1].kids.append(n)
        if tag not in VOID: self.stack.append(n)
    def handle_startendtag(self, tag, attrs):
        self.stack[-1].kids.append(Node(tag, attrs))
    def handle_endtag(self, tag):
        if tag in VOID: return
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]; return
    def handle_data(self, d):
        self.stack[-1].kids.append(d)
    def handle_comment(self, d):
        self.stack[-1].kids.append(("comment", d))

p = P(); p.feed(body)

HOLE = re.compile(r"\{\{\s*([^}]+?)\s*\}\}")

def camel(k):
    if k.startswith("--"): return json.dumps(k)
    parts = k.split("-")
    if parts[0] == "": parts = parts[1:]; parts[0] = parts[0].capitalize()  # -webkit-x -> WebkitX
    return parts[0] + "".join(x.capitalize() for x in parts[1:])

def ref(path, scope):
    path = path.strip()
    if path in ("true", "false"): return path
    if re.fullmatch(r"-?\d+(\.\d+)?", path): return path
    head = path.split(".")[0]
    return path if head in scope else "v." + path

def style_obj(s):
    out = []
    for decl in s.split(";"):
        if ":" not in decl: continue
        k, val = decl.split(":", 1)
        k, val = k.strip(), val.strip()
        if not k: continue
        out.append(f"{camel(k)}: {json.dumps(val)}")
    return "{{" + ", ".join(out) + "}}"

def interp(s, scope):
    # "a {{x}} b" -> `a ${v.x} b`
    parts = HOLE.split(s); o = ""
    for i, part in enumerate(parts):
        if i % 2: o += "${" + ref(part, scope) + "}"
        else: o += part.replace("`", "\\`").replace("${", "\\${")
    return "`" + o + "`"

def attr_jsx(k, val, scope, tag):
    lk = k.lower()
    if lk.startswith("hint-"): return None
    name = ATTR.get(lk, k)
    if lk.startswith("on") and len(lk) > 2:  # parser lowercases: onclick -> onClick
        name = {"onclick": "onClick", "onchange": "onChange", "oninput": "onInput", "onkeydown": "onKeyDown", "onsubmit": "onSubmit", "onmouseenter": "onMouseEnter", "onmouseleave": "onMouseLeave"}.get(lk, "on" + lk[2].upper() + lk[3:])
    if svg_attr(lk): name = camel(lk)
    if val is None:
        return name if lk in BOOL else f'{name}=""'
    if lk in BOOL and not HOLE.search(val):
        return name
    if HOLE.fullmatch(val.strip()):
        expr = ref(HOLE.fullmatch(val.strip()).group(1), scope)
        if lk == "style": return f"style={{css({expr})}}"
        return f"{name}={{{expr}}}"
    if HOLE.search(val):
        expr = interp(val, scope)
        if lk == "style": return f"style={{css({expr})}}"
        return f"{name}={{{expr}}}"
    if lk == "style": return f"style={style_obj(val)}"
    return f"{name}={json.dumps(val)}"

def svg_attr(k):
    return k in ("stroke-width", "stroke-linecap", "stroke-linejoin", "fill-rule", "clip-rule", "stroke-dasharray", "stroke-dashoffset",
                 "stop-color", "stop-opacity", "font-family", "font-size", "font-weight", "text-anchor", "clip-path", "fill-opacity", "stroke-opacity")

def text_jsx(t, scope):
    if not t.strip():
        return " " if "\n" not in t and t else ("" if "\n" in t else t)
    if HOLE.search(t):
        parts = HOLE.split(t); o = ""
        for i, part in enumerate(parts):
            if i % 2: o += "{" + ref(part, scope) + "}"
            else: o += esc(part)
        return o
    return esc(t)

def esc(t):
    if any(c in t for c in "{}<>"):
        return "{" + json.dumps(t) + "}"
    return t

def emit(n, scope, ind=0):
    pad = "  " * ind
    if isinstance(n, str): return text_jsx(n, scope)
    if isinstance(n, tuple): return ""
    if n.tag == "sc-for":
        a = dict(n.attrs); lst = ref(HOLE.fullmatch(a["list"].strip()).group(1), scope); var = a["as"]
        inner = "".join(emit(k, scope | {var}, ind + 1) for k in n.kids)
        return f"{{{lst}.map(({var}, i_{var}) => (<React.Fragment key={{i_{var}}}>{inner}</React.Fragment>))}}"
    if n.tag == "sc-if":
        a = dict(n.attrs); cond = ref(HOLE.fullmatch(a["value"].strip()).group(1), scope)
        inner = "".join(emit(k, scope, ind + 1) for k in n.kids)
        return f"{{{cond} && (<>{inner}</>)}}"
    attrs = [x for x in (attr_jsx(k, v, scope, n.tag) for k, v in n.attrs) if x]
    a = (" " + " ".join(attrs)) if attrs else ""
    if n.tag in VOID or not n.kids:
        return f"<{n.tag}{a} />"
    inner = "".join(emit(k, scope, ind + 1) for k in n.kids)
    return f"<{n.tag}{a}>{inner}</{n.tag}>"

jsx = "".join(emit(k, frozenset()) for k in p.root.kids)

# ---- logic: DC class -> React class
logic = script.strip()
logic = logic.replace("class Component extends DCLogic {", "export default class Landing extends React.Component<{ autoplay?: boolean }, any> {", 1)
logic = logic.replace("this.props.autoplay ?? true", "this.props.autoplay ?? true")
# add render()
logic = logic.rstrip()
assert logic.endswith("}")
logic = logic[:-1] + "  render() {\n    const v: any = this.renderVals();\n    return (<>" + jsx + "</>);\n  }\n}\n"

header = '''// @ts-nocheck
"use client";
/* eslint-disable */
// Generated from the CraftlyAI landing v3 design (Landing3.dc.html) by dc2jsx.py.
import React from "react";

// turn a CSS declaration string (with live values) into a React style object
function css(s: string): React.CSSProperties {
  const o: any = {};
  String(s || "").split(";").forEach((d) => {
    const i = d.indexOf(":");
    if (i < 0) return;
    const k = d.slice(0, i).trim();
    if (!k) return;
    const key = k.startsWith("--") ? k : k.replace(/^-/, "").replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^webkit/, "Webkit");
    o[key] = d.slice(i + 1).trim();
  });
  return o;
}

'''
# type-loosen class members
logic = logic.replace("constructor(props) {", "timer: any; demoT: any; kicked: any;\n  constructor(props: any) {", 1)
open(f"{OUTDIR}/landing.tsx", "w").write(header + logic)
print("ok", len(jsx))
