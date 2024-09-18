<script>
export let caption=''
export let selected='';
export let value=''
export let title=''
export let store=null;
export let showtitle=false;
import Textout from './textout.svelte'
const onclick=()=>{
    if (!store) return;
    if ($store) store.set('');
    else store.set(value);
}
$: choosen= selected==value || (store&&$store==value);

</script>

<span class="choicebutton" on:click={onclick} {title} aria-hidden="true" class:hide={selected!=''||(store&&$store!='')}
class:chosenbutton={choosen}>
{#if caption.charAt(0)=='<'}{@html caption}{:else}{caption}{/if}

{#if showtitle&&!choosen}<Textout text={title}/>{/if}
</span>


<style>
.choicebutton {padding-left: 5px;padding-right:5px}
</style>