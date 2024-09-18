<script>
import { downstreamicon } from './comps/svgicon';
import NestlineLink from './nestedlinelink.svelte'
export let lineinfo;
export let addr;
export let active=false;
$: locallinks=lineinfo?.locallinks||[];
</script>
{#if active}
{#each locallinks as absline}
<NestlineLink {absline} {addr}/>
{/each}
{:else}
{#if locallinks.length}{@html downstreamicon}{/if}
{/if}
