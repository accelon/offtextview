<script>
import {removeBracket} from 'ptk/utils/cjk.ts'
import {parsePolyToc} from 'ptk/utils/polytoc.ts'
export let addr='';
export let tagname='';
export let text='';
export let attrs={};
export let ptk=null;
export let active=false;
import Textout from '../comps/textout.svelte'
$: depth=attrs.id?parsePolyToc(attrs.id).length:0;
$: attrs,addr,ptk,active;
</script>
<span class={"offtag_"+tagname}
 style={'color:var(--depthcolor'+(depth%15)+')'}><Textout text={removeBracket(text)}/></span>
