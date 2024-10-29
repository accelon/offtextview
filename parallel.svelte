<script>
import {getContext} from 'svelte'
import {getSliceText} from 'ptk/basket/entries.ts'
import {painters} from './painters.js'
import { parsePageBookLine } from 'ptk/offtext/parser.ts';
export let addr;
export let depth=0;
export let active=false;
const ctx=getContext("ctx");
const shownparallels=ctx?.shownparallels;
$: [page,book,line]=parsePageBookLine(addr);
$: alignables=ctx?.ptk?.alignable(book)||[];
$: depth;
const fetchPage=(page,book)=>{
    let [lines]=getSliceText(book,page,ctx?.ptk);
    return lines;
}
const toggleparallel=(book)=>{
    const arr=$shownparallels;
    const at=arr.indexOf(book);
    if (~at) arr.splice(at,1);
    else arr.push(book);
    shownparallels.set(arr);
}
const getParallelLine=(parallelbook)=>{
    const lines=fetchPage(page,parallelbook).split(/\n/);
    const r=lines[line]
    return r;
}
const getAlignCaption=book=>{
    const tagattrs=ctx?.ptk.getTagById("bk",book);
    return tagattrs?.aligncaption||book;
}

</script>
{#if active}
{#each alignables as alignable}
{#if ~$shownparallels.indexOf(alignable)}
<br/>
{/if}
<span on:click={()=>toggleparallel(alignable)} aria-hidden="true"
    class:chosenbutton={~$shownparallels.indexOf(alignable)}
    class="clickable">{getAlignCaption(alignable)}</span>&nbsp;
{#if ~$shownparallels.indexOf(alignable)}
<svelte:component this={painters.NestedLine} text={getParallelLine(alignable,addr)} />
{/if}
{/each}
{/if}