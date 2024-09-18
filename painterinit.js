import NestedLine from './nestedline.svelte'
import NestedText from './nestedtext.svelte'
import Transclusion from './transclusion.svelte'
import TranscludePage from './transcludepage.svelte'
import {painters} from './painters.js'
import X from './painters/x.svelte'
import Y from './painters/y.svelte'
import Z from './painters/z.svelte'
import PNG from './painters/png.svelte'
export const painterInit=()=>{
    painters["NestedLine"]=NestedLine;
    painters["NestedText"]=NestedText;
    painters["Transclusion"]=Transclusion;
    painters["TranscludePage"]=TranscludePage;
    painters["x"]=X;
    painters["y"]=Y;
    painters["z"]=Z;
    painters["png"]=PNG;
    for (let i=0;i<26;i++) painters['x'+ String.fromCharCode(0x61+i) ]=X;
    for (let i=0;i<26;i++) painters['y'+ String.fromCharCode(0x61+i) ]=Y;
    for (let i=0;i<26;i++) painters['z'+ String.fromCharCode(0x61+i) ]=Z;
}