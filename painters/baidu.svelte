<script>
import {baidu} from '../comps/svgicon.js'
export let ptk;
export let line;
export let lang='';
export let caption='';
export let depth=0;
export let ln='';
export let highlighted=false;
$: ptk,line,highlighted,ln,depth,lang;
const href="https://baike.baidu.com/item/"+ln;
</script>
<a target="_new" {href}>{caption}{@html baidu}</a>
