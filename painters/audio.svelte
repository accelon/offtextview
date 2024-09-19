<script>
import {downloadToCache} from 'ptk/platform/downloader.js'
import {_} from '../comps/textout.js'
import {sleep} from 'ptk'
import {downloadicon} from '../comps/svgicon.js'
//import {cachedMp3,activeMp3} from '../store.js';
//import {ACC23} from '../appconst.js'
import { getContext } from 'svelte';
export let url='';
export let line;
export let ptk,caption,lang,highlighted,depth,filesize=0,title;
$: ptk,caption,length,lang,highlighted,depth
//TODO only show control when highlighted
$: line

const ctx=getContext('ctx');
// $: console.log(line,filesize,highlighted)
let downloading=false,progress='';
const downloadit=async (url)=>{
    downloading=url;
    await downloadToCache(ctx.CacheName,url,msg=>{
        progress=msg;
    });
    await sleep(1000); //wait for cache to sync
    const cached=$ctx.cachedMp3.concat(url.replace('.mp3',''));
    ctx.cachedMp3.set(cached)
    downloading='';
    progress='';
}

</script>
{#if !~$ctx.cachedMp3.indexOf(url.replace('.mp3',''))}
<span aria-hidden="true" class="clickable" on:click={()=>!downloading&&downloadit(url)}>{@html downloadicon}{filesize||''}</span>
{#if downloading==url}{progress}{/if}
{:else}

{#if url==$ctx.activeMp3}
<audio controls height="20" loop=true>
<source src={url} type="audio/mpeg"/>
</audio>
{:else}
<span aria-hidden="true" on:click={()=>activeMp3.set(url)}>▶️{title||url}</span>
{/if}
{/if}
