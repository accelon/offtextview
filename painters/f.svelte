<script>
    /* ms-word style footnote , link with id*/
import {styledNumber} from 'ptk/utils/cnumber.ts'
//import OfftextPaint from '../offtextpaint.svelte';
import NestedLine from '../nestedline.svelte';
export let id=null;
export let ln=null;
export let ptk;
export let caption='';
export let highlighted=false;
export let depth=0;
export let line;
$: text=ptk?.footNoteInTSV(id,line);
$: caption,highlighted,depth,lang,id,ln;
// $: console.log('i',linetext,id)
export let showing=false;
</script>
{#if highlighted}
<span aria-hidden="true" on:click={()=>showing=!showing} 
    class:selected={showing} 
    class="clickable offtag_f">{showing?styledNumber(id):'◂'}</span>{/if}{#if showing}<span 
    style={"border-bottom:1px solid var(--depthcolor"+(depth+1)+"); border-right:3px solid var(--depthcolor"+(depth+1)+")"}
><NestedLine depth={depth+1} {text} {line} {highlighted} /></span>{/if}
