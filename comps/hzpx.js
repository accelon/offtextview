import {loadUrl} from 'ptk/utils/helper.ts'
import {REGEX_IRE} from 'ptk/utils/cjk.ts'
let ptk;
let hzpxserver='https://nissaya.cn/hzpx';
export const setHzpxPtk=(_ptk)=>{
    ptk=_ptk;
}

export const getHzpxSVGFromPtk=(ire)=>{
    if (!ptk) return '';
    const col=ptk.columns?._ire;
    if (!col) return '';
    const at=col.keys.indexOf(ire)
    if (~at) {
        return col.fieldvalues[1][at];
    }
}
export const setHzpxServer=()=>{
    const host=window.location.host;
    const protocol=window.location.protocol;
    if ((~host.indexOf('127.0.0.1')||~host.indexOf('localhost')) && protocol=='http:') {
        hzpxserver='http://127.0.0.1:5080/';
    }
}

export const patchSVG=(svg,patch)=>svg.replace(/<svg /,'<svg '+patch+' ');

export const getHzpxSVGFromServer=async (ire,size=24,color="silver")=>{
    const url=hzpxserver+'?g='+ire+'&svg=1&size='+size+'&color='+color;
    return (await loadUrl(url)).replace(/\r?\n/g,'');
}
export const fetchSVGfromIreArray=async (irearray)=>{
    const out=[];
    for (let i=0;i<irearray.length;i++) {
        const ire=irearray[i];
        let svg=localStorage.getItem(ire);
        if (!svg) {
            svg=await getHzpxSVGFromServer(ire);
            if (svg) localStorage.setItem(ire,svg);
        }
        if (svg) out.push([ire,svg]);
    }
    return out;
}

export const enumIre=text=>{
    const out=[];
    text.replace(REGEX_IRE,(m,ire)=>{
        out.push(ire)
    });
    return out;
}


/*
import {hzpxready} from './store'
import {loadScript} from 'ptk/utils/loadscript.ts'

import Hzpx,{isDataReady} from 'hzpx-engine/web.ts'

export const loadhzpx=async ()=>{
    await loadScript('cjkbmp.js',()=>Hzpx.cjkbmp?.length);
    await loadScript('gwcomp.js',()=>Hzpx.gwcomp?.length);
    await loadScript('cjkext.js',()=>Hzpx.cjkext?.length);

    let timer=setInterval(()=>{
        if (isDataReady()){
            hzpxready.set(true);
            clearInterval(timer);
        }
    },1000)    
}
*/