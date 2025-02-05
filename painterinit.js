import NestedLine from './nestedline.svelte'
import NestedText from './nestedtext.svelte'
import Transclusion from './transclusion.svelte'
import TranscludePage from './transcludepage.svelte'
import f from './painters/f.svelte'
import i from './painters/i.svelte'
import p from './painters/p.svelte'
import t from './painters/t.svelte'
import l from './painters/l.svelte'
import UIIcon from './painters/uiicon.svelte'
import wiki from './painters/wiki.svelte'
import baidu from './painters/baidu.svelte'
import img from './painters/img.svelte'
import audio from './painters/audio.svelte'
import clip from './painters/clip.svelte'

import {painters} from './painters.js'
import X from './painters/x.svelte'
import Y from './painters/y.svelte'
import Z from './painters/z.svelte'
import Q from './painters/q.svelte'
import PNG from './painters/png.svelte'
export const painterInit=()=>{
    painters["NestedLine"]=NestedLine;
    painters["NestedText"]=NestedText;
    painters["Transclusion"]=Transclusion;
    painters["TranscludePage"]=TranscludePage;
    painters["x"]=X;
    painters["y"]=Y;
    painters["z"]=Z;
    painters["q"]=Q;
    painters["png"]=PNG;
    painters["uiicon"]=UIIcon;
    painters["audio"]=audio;
    painters["img"]=img;
    painters["wiki"]=wiki;
    painters["baidu"]=baidu;
    painters["f"]=f;
    painters["i"]=i;
    painters["p"]=p;
    painters["t"]=t;
    painters["l"]=l;

    painters["clip"]=clip;
    for (let i=0;i<26;i++) painters['x'+ String.fromCharCode(0x61+i) ]=X;
    for (let i=0;i<26;i++) painters['y'+ String.fromCharCode(0x61+i) ]=Y;
    for (let i=0;i<26;i++) painters['z'+ String.fromCharCode(0x61+i) ]=Z;
}