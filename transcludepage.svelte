<script>
import {getContext} from 'svelte'
import { getSliceText } from 'ptk/basket/entries.ts';
import {painters} from './painters'
import {moreicon} from './comps/svgicon.js'
export let book='';
export let addr=''
export let page='';
export let pline=0;//從yid算起的偏移量
export let active=false;
export let depth=0;
export let nolinebreak=false;
export let parent=''
const ctx=getContext('ctx');
let linestext=[];
let pagetext='',text='',lineinfo=[],lineoff=0;
let from=0,to=0,numberpage=0;
const loadtext=()=>{
    [pagetext,lineinfo,numberpage,lineoff]=getSliceText(book,page,ctx.ptk);
    linestext=pagetext.split('\n');
    from=pline;
    to=pline+1;
}
const slicetext=()=>{
    text=linestext.slice(from,to).join('\n')
}
const moreup=(all=false)=>{
    if (all) from=0;
    else if (from>0) from--;
}
const moredown=(all=false)=>{
    if (all) to=linestext.length;
    else if (to<linestext.length) to++;
}
const go=evt=>{
    ctx.gopagebookline(numberpage||page,book,pline+lineoff,true);
    evt.stopPropagation();
}
$: loadtext(page,pline,ctx.ptk);
$: slicetext(from,to,linestext);
$: addr;
</script>
{#if active}

{#if from>0}
<span class="clickable" 
on:click={moreup} aria-hidden="true">{from}</span><span class="btnmore" on:click={()=>moreup(false)} 
    aria-hidden="true">{@html moreicon}</span>
{/if}
{/if}
<svelte:component this={painters.NestedText} {nolinebreak} {text}
 {active} depth={depth+1} addr={page+'@'+book} {parent}/>
{#if active&&to<linestext.length}
<span 
class="btnmore" on:click={()=>moredown(false)} 
 aria-hidden="true">{@html moreicon}</span><span class="btnmore" on:click={moredown} 
 aria-hidden="true">{linestext.length-to}</span>
{/if}
