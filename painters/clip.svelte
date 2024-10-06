<script>
import {_} from '../comps/textout.js'

import {onDestroy,getContext} from 'svelte'
export let url='';
export let line=0;
export let caption='',lang='',highlighted=false,depth=0,start=0,end=0,attrs,addr,active,tagname,text='';
$: caption,length,lang,highlighted,depth,attrs,addr,active,tagname,lang,depth,text;
$: line
let timer;
const ctx=getContext('ctx')

onDestroy(()=>{
    clearTimeout(timer)
});
function playPause(e) {
    const track=document.getElementById("track")
    const controlBtn=e.target;
    if (track.paused) {
        track.currentTime=parseFloat(start)||0;
        const duration= (parseFloat(end)||track.currentTime)- track.currentTime;
        clearTimeout(timer)
        timer=setTimeout(()=>{
            track.pause();
            controlBtn.textContent = "▶️";
        },duration*1000);
        track.play();
        controlBtn.textContent = "⏹️";
    } else { 
        track.pause();
        controlBtn.textContent = "▶️";
    }
}
</script>
{#if ~ctx.cachedMp3.indexOf(url.replace('.mp3','')) && highlighted} 
<audio id="track">
<source src={url} type="audio/mpeg"/>
</audio>
<span aria-hidden={true} id="play-pause" on:click={playPause} class="clickable">▶️</span>
{/if}
<style>

</style>