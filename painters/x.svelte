<script>
import {getContext} from 'svelte'
import { parsePageBookLine } from 'ptk/offtext/parser.ts';
import {pageBookLineOfAnchor} from 'ptk/basket/entries.ts'
import {painters} from '../painters.js'
import Textout from '../comps/textout.svelte';
import { removeBracket } from 'ptk/utils/cjk.ts';
//import {fromAnchor} from '../store.js'
import { upstreamicon } from '../comps/svgicon.js';
export let tagname='';
export let offtag='';
export let text=''; //text inside bracket
export let depth=0;
export let addr='';
export let attrs={};
export let active=false;
export let id='',ln='';
const ctx=getContext("ctx")
let page, book, line;
$: yid=tagname.replace(/^x/,'y')+attrs.id;
let highlight,pbl
$: id,ln;
const findPageLine=()=>{
    const [ppage,pbook,lineoff]=parsePageBookLine(addr);
    book=attrs.ln;
    if (!book) {//try from text
        book=ctx.ptk.guessBookId(text);
    }
    book=book||pbook;
    let tbook;
    [page,tbook,line]=parsePageBookLine(yid);
    //use pbl to check 
    pbl=pageBookLineOfAnchor(yid+'@'+book,ctx.ptk);
    //highlight=ctx.fromAnchor==pbl;
}
const go=evt=>{
    //fromAnchor.set(addr);
    const [p,b,l]=parsePageBookLine(pbl)
    ctx.gopagebookline(p,b,l);
    evt.stopPropagation();
}
$: findPageLine(yid);

</script>
<span class="clickable quotetitle" class:highlight on:click={go}
aria-hidden={true}>
<Textout text={removeBracket(text)}/>{@html upstreamicon}</span><span class="quotetext"><svelte:component 
this={painters.TranscludePage} {addr} nolinebreak={true} 
{page} {line} {book} {active} {depth}/></span>
