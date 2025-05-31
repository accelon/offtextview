<script>
    /* ms-word style footnote , link with id*/
import {getContext} from 'svelte';
import {styledNumber} from 'ptk/utils/cnumber.ts'
//import OfftextPaint from '../offtextpaint.svelte';
import NestedLine from '../nestedline.svelte';
export let id=null;
export let ln=null;
export let caption='';
export let highlighted=false;
export let depth=0;
export let line;
export let lang=0;
export let tagname='';
export let text='';
export let addr='';
export let active=false;
export let ptk=null;
export let attrs={};

const ctx=getContext('ctx');
if (!ptk) ptk=ctx.ptk;
$: text=ptk?.footNoteInTSV&&ptk?.footNoteInTSV(id,line)||"COULD NOT FIND FOOTNOTE "+(id);
$: caption,active,depth,lang,id,ln,tagname,addr,active,attrs,highlighted;

// $: console.log('i',linetext,id)
export let showing=false;
</script>
{#if active}
<span aria-hidden="true" on:click={()=>showing=!showing} 
    class:selected={showing} 
    class="clickable offtag_f">{showing?styledNumber(id):'◂'}</span>{/if}{#if showing}<span 
    style={"border-bottom:1px solid var(--depthcolor"+(depth+1)+"); border-right:3px solid var(--depthcolor"+(depth+1)+")"}
><NestedLine depth={depth+1} {text} {line} {active} /></span>{/if}
