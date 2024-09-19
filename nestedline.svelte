<script>
import {breakRenderUnit} from './comps/renderunit.js'
import Transclusion from './transclusion.svelte'
import NestedLineInfo from './nestedlineinfo.svelte'
import Offtext from './comps/offtext.svelte'; //just bracket text, no offtag
import Offtag from './comps/offtag.svelte';   
import Textout from './comps/textout.svelte'
import Parallel from './parallel.svelte';
export let addr='';
export let text='';
export let depth=0;
export let rendsent='';
export let line=0;
export let lineinfo=null;
export let active=false;

let color,size;
$: line,rendsent;
$: units=breakRenderUnit(text);

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
{#each units as unit,idx}
{#if unit.type=='transclusion'}<Transclusion {active} {addr} 
text={unit.text} {depth}/>{:else if unit.type=='html'}{@html 
unit.text}{:else if unit.offtag}<Offtag text={unit.text} 
offtag={unit.offtag} {addr} {active}/>{:else if unit.type=='offtext'}<Offtext 
text={unit.text} {addr}/>{:else}<Textout 
text={unit.text.replace(/\^\^/g,'^').replace(/\n/g,"<br/>")} 
tappable={true}/>{/if}{/each}{#if text.length}<NestedLineInfo 
{active} {addr} {lineinfo}/><Parallel {addr} {active}/>{/if}
