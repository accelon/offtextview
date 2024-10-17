<script>
import {parseOfftag} from 'ptk/offtext/parser.ts'
import {painters} from '../painters.js'
import Textout from './textout.svelte'
import { removeBracket } from 'ptk/utils/cjk.ts';
export let addr='';
/* offtag without text or "{}"  */
export let offtag='';
export let active=false;
export let text='';
export let dimtext=false;
export let alt='';
$: [tagname,attrs]=parseOfftag(offtag,text);
$: alt
</script>
{#if painters[tagname]}
<svelte:component this={painters[tagname]} {tagname} {attrs} {text} {addr} {active} {...attrs} />
{:else}
<span class={"offtag_"+tagname} {...attrs}><Textout {dimtext} text={removeBracket(text)}/></span>
{/if}
