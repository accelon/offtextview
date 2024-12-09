<script>
export let ire='';
export let size=24;
export let color='silver'
import {getHzpxSVGFromPtk,patchSVG,getHzpxSVGFromServer} from './hzpx.js'
$: svg='';
const loadsvg=async(ire)=>{
    svg=localStorage.getItem(ire);
    if (!svg) {
        svg=getHzpxSVGFromPtk(ire);
    }
    if (!svg) {
        svg=await getHzpxSVGFromServer(ire,size,color)
        localStorage.setItem(ire,svg); 
    }
    svg = patchSVG(svg, 'style="padding-top:0.2em" title="'+ire+'"');
}

$: loadsvg(ire);
</script>
{@html svg}