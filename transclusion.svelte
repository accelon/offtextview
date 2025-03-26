<script>
import { URL_REGEX } from 'ptk/utils/constants.ts';
import { offTagType, parsePageBookLine} from 'ptk/offtext/parser.ts';
import {upstreamicon} from './comps/svgicon.js'
import { captionOfPage, pageBookLineOfAnchor,getSliceText} from 'ptk/basket/entries.ts';
import {parseTransclusion} from 'ptk/offtext/parser.ts';
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
export let parent='';
export let offtag='';//optional

const ctx=getContext('ctx');
let opened=false;
let showback=false;
let caption='',transclusiontext='',link='';
let istranscludepage=false,page='',line=0,book='',lineinfo,key;
let links=[];

const getTransclusion=()=>{
    const ptk=ctx.transclusiondict||ctx.ptk;
    let tag='';
    [tag,link,caption]=parseTransclusion(text);
    let [pg,bk]=parsePageBookLine(link);
    if (offtag) {
        pg=offtag; // offtag has priority
        let [p,b,l]=parsePageBookLine(offtag);
        caption=caption||captionOfPage(ptk,b,p,l,true);
        book=b||ctx.book;
        line=l;
        istranscludepage=true;
        [transclusiontext,lineinfo,page]=getSliceText(book,p,ptk);
    } else if (pg.startsWith('x')) {
        const pbl=pageBookLineOfAnchor(text,ptk,bk||ctx.book);
        const [p,b,l]=parsePageBookLine(pbl);
        caption=caption||captionOfPage(ptk,bk,p,l,true);
        book=b||ctx.book;
        line=l;
        istranscludepage=true;
        [transclusiontext,lineinfo,page]=getSliceText(book,p,ptk);
    } else {
       [transclusiontext,lineinfo,page]=getSliceText(bk,pg,ptk);
        key=lineinfo.length?lineinfo[0].key:'';
        if (transclusiontext) {
            book=bk||ctx.book;
            line=0;
            istranscludepage=true;
        }
        else { //try addr
            [pg,bk]=parsePageBookLine(addr);//transclusion may specified anchor
            [transclusiontext,lineinfo]=getSliceText(bk,pg,ptk);
            page=pg;
            book=bk;
            line=0;
        }
        if (transclusiontext) istranscludepage=true;
    }
}
$: getTransclusion(text);
const transcluding=ctx.transcluding;

const goUpstream=evt=>{
    ctx.gopagebookline(page,book,line);
    evt.stopPropagation();
    transcluding.set(false)
}
const openclose=()=>{
    const ptk=ctx.transclusiondict||ctx.ptk;
    const m=link.match(/[asdm]n[\d\.]+/);
    if (!transclusiontext && !istranscludepage) {
    //try tipitaka
        if (m) window.open('https://suttacentral.net/'+caption);
        else if (link.match(URL_REGEX))  window.open(link);
    } else {
        opened=!opened;
        if (opened&&!links.length) {
            links=ptk.backTransclusionOf(link);
        }
        transcluding.set( opened?link:parent);
    }
}

const showBacklink=()=>{
    showback=!showback;
}

$: dimtext=$transcluding &&($transcluding!==link &&$transcluding!==parent);
</script>
<span aria-hidden="true" on:click={openclose} class="clickable" title={key}
class:transclusion_link={istranscludepage||!!transclusiontext}
class:transclusion_broken={!istranscludepage&& !transclusiontext &&!link.match(URL_REGEX)}
class:transclusion_url={link.match(URL_REGEX)}
class:transclusion_opened={opened}><Textout {dimtext} text={caption}/></span>{#if opened}
<span class="clickable quotetitle" on:click={goUpstream}
aria-hidden={true}>{@html upstreamicon}</span>
<span style=
{"border-bottom:1px solid var(--depthcolor"+(depth+1)+
"); border-left:3px dashed var(--depthcolor"+(depth+1)+
"); border-right:3px dashed var(--depthcolor"+(depth+1)+")"} 
in:fade out:fade>{#if transclusiontext}<svelte:component 
  this={painters.NestedLine} {addr} parent={link} 
  text={transclusiontext} depth={depth+1}/>{:else}<svelte:component 
  this={painters.TranscludePage} {addr} {book} {page} parent={link} 
  depth={depth+1} {line} {active}/>{/if}{#if links.length}{#if showback}<span aria-hidden="true" class="clickable"
    on:click={showBacklink}>⇚</span><Backlinks 
    {links} {depth} parent={link}/>{:else}<span 
    aria-hidden="true" class="clickable" on:click={showBacklink}>⇛</span>{/if}{/if}</span>{/if}