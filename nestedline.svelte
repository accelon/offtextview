<script>
import {breakRenderUnit} from './comps/renderunit.js'
import Transclusion from './transclusion.svelte'
import NestedLineInfo from './nestedlineinfo.svelte'
import Offtext from './comps/offtext.svelte'; //just bracket text, no offtag
import Offtag from './comps/offtag.svelte';   
import Textout from './comps/textout.svelte'
import Parallel from './parallel.svelte';
import {getContext} from 'svelte'

export let addr='';
export let text='';
export let depth=0;
export let rendsent='';
export let line=0;
export let lineinfo=null;
export let active=false;
export let parent=''
const ctx=getContext('ctx');
let color,size;
$: line,rendsent;
$: units=breakRenderUnit(text);
const transcluding=ctx?.transcluding;
$: dimtext=$transcluding && $transcluding!==parent;

export const setstyle = (node, params)=>{
    let style=getComputedStyle(node);
    color=style.getPropertyValue('color');
    const parentsize=parseInt(style.getPropertyValue('font-size'))+2;
    size=parentsize;
    if (!parseInt(size) && node.parentNode){ //workaround for font-size:0px, 
        style=getComputedStyle(node.parentNode);
        size=style.getPropertyValue('font-size');
    }
}
</script>
{#each units as unit}
{#if unit.type=='transclusion'}<Transclusion {active} {addr} {parent}
text={unit.text} {depth}/>{:else if unit.type=='html'}{@html 
unit.text}{:else if unit.offtag}<Offtag {dimtext}  text={unit.text} 
offtag={unit.offtag} {addr} {line} {active}/>{:else if unit.type=='offtext'}<Offtext 
text={unit.text} {addr} {line}/>{:else}<Textout {dimtext} 
text={unit.text.replace(/\^\^/g,'^').replace(/\n/g,"<br/>")} 
tappable={true}/>{/if}{/each}{#if text?.length}<NestedLineInfo 
{active} {addr} {lineinfo}/><Parallel {addr} {active}/>{/if}