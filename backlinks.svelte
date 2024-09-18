<script>
export let links=[];
export let depth=0;

import {painters} from './painters.js'
//import {changePage } from './format';
import { downstreamicon } from './comps/svgicon.js';
export const gotopage=p=>{
  //  changePage(p)
}
</script>
{#each links as link}
{#if parseInt(link).toString()==link}
<span aria-hidden="true" class="clickable" on:click={()=>gotopage(link)}>{@html downstreamicon}{link}</span>
{:else}
<svelte:component this={painters.Transclusion} text={link} depth={depth+1}/>
{/if}{" "}
{/each}