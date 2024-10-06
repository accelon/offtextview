<script>
import {getContext} from 'svelte'
export let links=[];
export let depth=0;
const ctx=getContext('ctx');
import {painters} from './painters.js'
import { downstreamicon } from './comps/svgicon.js';

const gotopage=()=>{
  //ctx.
}
</script>
{#each links as text}
{#if parseInt(text).toString()==text}
<span aria-hidden="true" class="clickable" on:click={()=>gotopage(text)}>{@html downstreamicon}{text}</span>
{:else}
<svelte:component this={painters.Transclusion} {text} depth={depth+1}/>
{/if}{" "}
{/each}