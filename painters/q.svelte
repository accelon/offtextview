<script>
import {removeBracket} from 'ptk/utils/cjk.ts'
export let text='';
export let addr='';
export let active=false;
export let attrs={};
import Textout from '../comps/textout.svelte'
$: attrs,active,addr;

</script>
<span class="quotetext"><Textout text={removeBracket(text)}/></span>
