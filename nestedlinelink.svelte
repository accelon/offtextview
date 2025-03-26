<script>
import {getContext} from 'svelte'
import Textout from './comps/textout.svelte';
import {captionOfPage} from 'ptk/basket/entries.ts'
import { downstreamicon } from './comps/svgicon.js';
import { parsePageBookLine } from 'ptk/offtext/parser.ts';
const ctx=getContext('ctx');
export let absline=0;
export let addr=''
let book,page,lineoff,text;
$: addr
const transclusiontext=()=>{
    const DK=ctx.ptk.defines.dk;
    book=ctx.ptk.nearestTag(absline+1,'bk','id');
    const dkat=ctx.ptk.nearestTag(absline+1,'dk');
    lineoff=absline-DK.linepos[dkat];
    page=parseInt(DK.fields.id.values[dkat]);
    text=captionOfPage(ctx.ptk,book,page,lineoff);
    //bpl=page+'@'+book;
}
const isActive=()=>{
    const [p,b,l]=parsePageBookLine(ctx.fromAnchor);
    return (book==b&&page==p&&l==lineoff);
}

const goreftext=evt=>{
    ctx.gopagebookline(page,book,lineoff,true);
    evt.stopPropagation();
}
$: transclusiontext(addr);
const highlight=isActive();
</script>
<span aria-hidden={true} on:click={goreftext}
class="clickable backlink" class:highlight>{@html downstreamicon}<Textout {text}/></span>