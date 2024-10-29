<script>
import {removeBracket} from 'ptk/utils/cjk.ts'
export let tagname='';
export let text='';
export let addr='';
export let active=false;
export let attrs={};
import Textout from '../comps/textout.svelte'

$: depth=tagname.charCodeAt(1)-0x61
$: attrs,active,addr;

</script>
<span class={"offtag_"+tagname}
 style={'color:var(--depthcolor'+(depth%15)+')'}><Textout text={removeBracket(text)}/></span>
