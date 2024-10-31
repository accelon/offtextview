<script>
import {getContext} from 'svelte'
import {get} from 'svelte/store'
import Hzpxglyph from './hzpxglyph.svelte';
export let text=''
export let addr='';
export let line=0;//line in ptk, optional
import {_} from './textout.js'
import {sentencePosfromSelection,REGEX_IRE} from 'ptk/utils/cjk.ts'
export let tappable=false;
export let dimtext=false;
let color,size;
const ctx=getContext('ctx');
const breakSnippets=t=>{
    const out=[];
    let prev=0;
    t.replace(REGEX_IRE,(m,m1,idx)=>{
        if (idx>prev) out.push([t.slice(prev,idx),"plain"]);
        out.push([m1,"hzpx"]);
        prev=idx+m1.length+2;
    })
    out.push([t.slice(prev)||'',"plain"]);
    return out;
}
$: snippets=breakSnippets(text);
const setstyle = (node, params)=>{
    let style=getComputedStyle(node);
    color=style.getPropertyValue('color');
    const parentsize=style.getPropertyValue('font-size');
    size=parentsize;
    if (!parseInt(size) && node.parentNode){ //workaround for font-size:0px, 
        style=getComputedStyle(node.parentNode);
        size=style.getPropertyValue('font-size');
    }
}

const taptext=(e)=>{
    if (!ctx)return;
    const searchtofindidx=ctx.searchtofindidx;
    if (tappable && (!searchtofindidx || !get(searchtofindidx))) {
        const [sentence,pos,len]=sentencePosfromSelection(e.target.attributes.oritext.value);
        ctx.taptext&&ctx.taptext(sentence,pos,len,addr);
    }
}
</script>
<span class="bodytext" class:dimtext use:setstyle>{#each snippets as [text,type] }{#if type=='hzpx'}
<span style="font-size:0px"><Hzpxglyph {color} {size} ire={text}
/></span>{:else}<span on:click={taptext} aria-hidden={true} oritext={text} {line}
>{@html _(text,ctx?.sim)}</span>{/if}{/each}</span>