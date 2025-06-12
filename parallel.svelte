<script>
import {getContext} from 'svelte'
import {getSliceText} from 'ptk/basket/entries.ts'
import {painters} from './painters.js'
import { parsePageBookLine } from 'ptk/offtext/parser.ts';
export let addr;
export let depth=0;
export let line=0;
export let active=false;
const ctx=getContext("ctx");
const shownparallels=ctx?.shownparallels;
$: [page,book,localline]=parsePageBookLine(addr);
$: alignables=ctx?.ptk?.alignable(book)||[];

const fetchPage=(page,book)=>{
    let [lines,lineinfo,npage,nline]=getSliceText(book,page,ctx?.ptk);
    return [lines,nline];
}
const toggleparallel=(book)=>{
    const arr=$shownparallels;
    const at=arr.indexOf(book);
    if (~at) arr.splice(at,1);
    else arr.push(book);
    shownparallels.set(arr);
}
const getParallelLine=(parallelbook)=>{
    const [texts,nline]=fetchPage(page,parallelbook);
    const lines=texts.split(/\n/);
    const text=lines[localline];
    // ctx?.ptk?.rangeOfAddress(npage)
    return {text, line:line+nline , addr:page+'@'+parallelbook+'.'+localline};
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
<svelte:component this={painters.NestedLine} {...getParallelLine(alignable,addr)} {depth}/>
{/if}
{/each}
{/if}