<script>
import {_} from '../comps/textout.js'
import Transclusion from '../transclusion.svelte';
import { fade, fly } from 'svelte/transition';

export let ptk;
export let line;
export let lang='';
export let depth=0;
export let ln='';
export let id;
export let caption;
export let highlighted=false;
$: ptk,line,highlighted;
let opened=false,text='';
const col=ptk.columns?.transclusion;
const open=()=>{
    if (opened) {
        opened=false;
        text='';
        return;
    }
    if (ln) {

    } else if ((id||caption)&&col&&col.def) {//fetch from 
        const i=col.keys.find(id||caption);
        text=col.def[i];
        opened=true;
    }

}
</script>
<span class={"clickable transclusion "+(opened?'transclusion_opened':'')}
     style={opened?"text-decoration-color:var(--depthcolor"+(depth+1)+")":''}
     aria-hidden=true on:click={open}>{_(caption)}</span>{#if opened}<span in:fade out:fade><Transclusion {depth} {text} {highlighted} {lang} ptkname={ptk?ptk.name:''}/></span>
{/if}
