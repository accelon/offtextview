<script>
import {getContext} from 'svelte';
import NestedLine from './nestedline.svelte'
import {captionOf} from 'ptk/basket/entries.ts'
export let addr='';
export let text=''
export let active=true;
export let lineinfo=[];
export let depth=0;
export let nolinebreak=false;
export let activeline=0;
export let parent='';
export let lineoff=0;
$: lines = text.split(/\r?\n/);

const ctx=getContext('ctx');
const getNestedStyle=(show)=>{
    return show?
    "border-left:3px solid var(--depthcolor"+(depth+1)+"); padding-left:0px"
    :"";
}
const setActiveLine=l=>{
   activeline=l;
}
$: renderpng=captionOf(ctx.ptk,addr).indexOf('.png')>0;
//$:console.log(renderpng,captionOf(ctx.ptk,addr).indexOf('.png'))

</script>

{#each lines as text,idx}
{#if renderpng && idx}
<img style="filter:invert(1);transform: scale(2); transform-origin: top left" src={"data:image/png;base64,"+text} alt=""/>
{:else}
<div class="nestedline" aria-hidden="true"
on:click={()=>setActiveLine(idx)} style={getNestedStyle(activeline==idx&&active)}>
<NestedLine active={activeline==idx&&active} {depth} {parent} line={lineoff+idx}
addr={addr+(idx?'.'+idx:'')} {text} lineinfo={lineinfo[idx]}/>
</div>
{#if !nolinebreak&& lines.length>1}<br/>{/if}
{/if}
{/each}

<style>
    div {display: inline-block}
</style>