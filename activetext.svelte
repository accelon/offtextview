<script>
import { parsePageBookLine } from "ptk/offtext/parser.ts";
import {painters} from './painters.js'
import {getContext} from 'svelte'
import { getSliceText } from 'ptk/basket/entries.ts';
export let parent='';
export let depth=0;
const ctx=getContext('ctx');
const activetext=ctx.activetext;
let text='';
$: [word,addr]=$activetext||[];
$: [p,b,l]=parsePageBookLine(addr||'')
$: [text]=word?getSliceText(b+'-dict',word.toLowerCase(),ctx.ptk):[''];
</script>
{#if depth==0 && text}
{word||''}:<svelte:component this={painters.NestedText} 
{text} depth={depth+2} {parent} />
{/if}