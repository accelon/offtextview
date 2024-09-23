<script>
import {getContext} from 'svelte'
import { parsePageBookLine } from 'ptk/offtext/parser.ts';
import {getSliceText} from 'ptk/basket/entries.ts'
const ctx=getContext('ctx');
export let tagname='';
export let text='';
export let addr='';
export let active=false;
export let attrs={};
$: attrs,text,tagname,addr,active;
$: book=parsePageBookLine(addr)[1];
$: [alt,base64]=getSliceText(book+'-png',attrs.id+".png",ctx.ptk)[0].split('\n');
</script>
<img style="filter:invert(1)" {alt} src={"data:image/png;base64,"+base64}/>
