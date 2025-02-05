<script>
import {removeBracket} from 'ptk/utils/cjk.ts'
import {parsePolyToc} from 'ptk/utils/polytoc.ts'
export let addr='';
export let tagname='';
export let text='';
export let attrs={};
export let ptk=null;
export let active=false;
export let id='',ln='',line=0;
import Textout from '../comps/textout.svelte'
$: depth=(attrs.id||id)?parsePolyToc(attrs.id).length:0;
$: console.log(attrs.id||id,depth)
$: attrs,addr,ptk,active,id,ln,line;
</script>
<span class={"offtag_"+tagname}
 style={'color:var(--depthcolor'+(depth%15)+')'}><Textout text={removeBracket(text)}/></span>
