<script>
import { eatbracket } from "ptk/offtext/parser.ts";
import {_} from './textout.js'
import Textout from './textout.svelte'
import { removeBracket } from "ptk/utils/cjk.ts";
export let text='';
export let addr='';
$: brackets=eatbracket(text,'\t').split('\t');
$: addr;

</script>
{#each brackets as item}
<span class={"offtext"+item.charAt(0)
+" runtime"+item.charAt(0)}><Textout text={removeBracket(item)}/></span>&nbsp;
{/each}