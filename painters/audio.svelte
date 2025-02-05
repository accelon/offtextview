<script>
import {downloadToCache} from 'ptk/platform/downloader.js'
import {_} from '../comps/textout.js'
import {sleep} from 'ptk'
import {downloadicon} from '../comps/svgicon.js'
import { getContext } from 'svelte';
export let url='';
export let filesize=0;
export let tagname,attrs,addr,active,text='',title,line;
$: length,tagname,attrs,addr,active,text,title,line;
//TODO only show control when highlighted

const ctx=getContext('ctx');

// $: console.log(line,filesize,highlighted)
let downloading=false,progress='';
const downloadit=async (url)=>{
    downloading=url;
    await downloadToCache(ctx.CacheName,url,msg=>{
        progress=msg;
    });
    await sleep(1000); //wait for cache to sync
    const cached=ctx.cachedMp3.concat(url.replace('.mp3',''));
    ctx.cachedMp3=cached;
    downloading='';
    progress='';
}

</script>
{#if !~ctx.cachedMp3.indexOf(url.replace('.mp3',''))}
<span aria-hidden="true" class="clickable" on:click={()=>!downloading&&downloadit(url)}>{@html downloadicon}{filesize||''}</span>
{#if downloading==url}{progress}{/if}
{:else}
{#if url==ctx.activeMp3}
<audio controls height="20" loop=true>
<source src={url} type="audio/mpeg"/>
</audio>
{:else}
<span aria-hidden="true" on:click={()=>ctx.activeMp3=url}>▶️{title||url}</span>
{/if}
{/if}
