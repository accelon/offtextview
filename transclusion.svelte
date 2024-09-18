<script>
//import { usedBy,parseEntry,getFirstEntry } from './format';
//import {refreshcount,editingfile,theptk} from './store.js'
import { URL_REGEX } from 'ptk/utils/constants.ts';
import { removeBracket } from 'ptk/utils/cjk.ts';
import { parsePageBookLine} from 'ptk/offtext/parser.ts';
import { captionOfPage, pageBookLineOfAnchor,getSliceText} from './comps/ptk.js';
import {parseEntry} from './transclusion.js';
import {getContext} from 'svelte';
import {painters} from './painters.js'
import Backlinks from './backlinks.svelte'
import {fade} from 'svelte/transition';
import {_} from './comps/textout.js'
import Textout from './comps/textout.svelte'
export let addr='';
export let text;
export let depth=0;
export let active=false;

const ctx=getContext('ctx');
let opened=false;
let showback=false;
let caption='',transclusiontext='',entry='';
let istranscludepage=false,page='',line=0,book='';

const getTransclusion=()=>{
    const ptk=ctx.ptk;
    let link='';
    [caption,link]= parseEntry(text);
    
    const [pg,bk]=parsePageBookLine(link);
    if (pg.startsWith('x')) {
        const pbl=pageBookLineOfAnchor(text,ptk);
        const [p,b,l]=parsePageBookLine(pbl);
        caption=caption||captionOfPage(ptk,bk,p,l,true);
        page=pg;
        book=b;
        istranscludepage=true;
    } else {
        transclusiontext=getSliceText("lyxq",pg,ptk)[0];
        console.log(caption,transclusiontext)
        istranscludepage=true;
        // const res=getFirstEntry(link, ptk,bk||$editingfile);
        // if (res&&typeof res[0]!=='string') {
        //     [page,line]=res[0];//see matchEntry 
        //     caption=caption||removeBracket(res[0][2]);
        //     istranscludepage=true;
        // } else {
        //     transclusiontext=res[0]; //hyper links?
        // }
    }
}

$: getTransclusion(text);

const openclose=()=>{
    if (!transclusiontext && !istranscludepage) {
    //try tipitaka
        const m=caption.match(/[asdm]n[\d\.]+/);
        if (m) window.open('https://suttacentral.net/'+caption);
        else if (entry.match(URL_REGEX))  window.open(entry);
    } else {
        opened=!opened;
        //if (opened&&!links.length) links=usedBy(entry);
    }
}

let links=[];
const showBacklink=()=>{
    showback=!showback;
}
</script>
<span aria-hidden="true" on:click={openclose} class="clickable" title={entry}
class:transclusion_link={istranscludepage||!!transclusiontext}
class:transclusion_broken={!istranscludepage&& !transclusiontext &&!entry.match(URL_REGEX)}
class:transclusion_url={entry.match(URL_REGEX)}
class:transclusion_opened={opened}><Textout text={caption}/></span>{#if opened}<span style=
{"border-bottom:1px solid var(--depthcolor"+(depth+1)+
"); border-left:3px dashed var(--depthcolor"+(depth+1)+
"); border-right:3px dashed var(--depthcolor"+(depth+1)+")"} 
in:fade out:fade>{#if showback}<span aria-hidden="true" class="clickable"
   on:click={showBacklink}>⇚</span><Backlinks 
   {links} {depth}/>{:else}{#if transclusiontext}<svelte:component 
  this={painters.NestedLine} {addr}
  text={transclusiontext} depth={depth+1}/>{:else}<svelte:component 
  this={painters.TranscludePage} {addr} {book} {page} depth={depth+1} {line} {active}/>{/if}{#if links.length}<span 
aria-hidden="true" class="clickable" on:click={showBacklink}>⇛</span>{/if}{/if}</span>{/if}