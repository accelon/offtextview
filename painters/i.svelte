<script>
import { removeBracket } from 'ptk/utils/cjk.ts';
/* inline footnote , use ln or innertext as id in note tsv*/
import NestedLine from '../nestedline.svelte';
import {styledNumber} from 'ptk/utils/index.ts';
import {getContext} from 'svelte'
export let id=null;
export let ln=null; //優先用這個，可能是 innertext 或 <@別名>
export let caption='';
export let depth=0
export let line=0;
export let tagname='';
export let text='';
export let addr='';
export let active=false;
export let attrs={};
const ctx=getContext('ctx');
const ptk=ctx.ptk;

caption=caption||removeBracket(text)
$: caption,depth,tagname,text,addr,active,line,attrs;

$: text=ptk?.footNoteInTSV&&ptk?.footNoteInTSV(ln||caption||id||removeBracket(text),line);

export let showing=false;
</script>
<span aria-hidden="true" on:click={()=>showing=!showing} 
    class="bodytext clickable ifootnote" 
    class:selected={showing}>{caption||styledNumber(id)}</span>{#if showing}<span 
    style={"border-bottom:1px solid var(--depthcolor"+(depth+1)+"); border-right:3px solid var(--depthcolor"+(depth+1)+")"}
><NestedLine depth={depth+1} {text} {line} {active} /></span>{/if}