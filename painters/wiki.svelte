<script>
//import {tosim} from '../store.js'
import {wiki} from '../comps/svgicon.js'
export let ptk;
export let line;
export let lang='';
export let depth=0;
export let caption=''
export let ln='';
export let highlighted=false;
$: ptk,line,highlighted,ln,depth,lang;
const href="https://"+lang+'.wikipedia.org/wiki/'+ln;
</script>
<a target="_new" {href}>{caption}{@html wiki}</a>