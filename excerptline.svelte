<script>
import {_} from './comps/textout.js'
import Abridge from './comps/abridge.svelte';
import {MAXPHRASELEN} from 'ptk/fts/constants.ts';
export let text='';
export let hits=[];
export let phraselength=[];
export let phrasehits=[]
$: if (phrasehits) {
    hits =phrasehits.map(n=>Math.floor(n/MAXPHRASELEN));
    phraselength =phrasehits.map(n=>n%MAXPHRASELEN);
}
</script> 

<Abridge {phraselength} {text} {hits} let:tk>
{#if tk.highlight}<span class="hl0">{_(tk.text)}</span>{:else}{_(tk.text)}{/if}
</Abridge>

