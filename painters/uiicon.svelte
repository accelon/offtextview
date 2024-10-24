<script>
import {getContext} from 'svelte'
import {svgs} from '../comps/svgicon.js';
export let tagname='';
export let text='';
export let addr='';
export let active=false;
export let id='';
export let line=0;
export let attrs={};
$: attrs,text,tagname,addr,active,id,id,line;

</script>
{@html svgs[id]}