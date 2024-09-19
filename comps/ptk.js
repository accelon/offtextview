import { parsePageBookLine } from "ptk/offtext/parser.ts";
//import { getPageText } from "../format.js";
export const yidarrInRange=(ptk,s,e)=>{
    const [first,last]=ptk.tagInRange("y",s,e);
    const idarr=ptk.defines.y.fields.id.values;
    const linepos=ptk.defines.y.linepos;
    const out=[];
    for (let i=first;i<=last;i++) {
        out[linepos[i]-s]="y"+idarr[i];
    }
    let prev='',lineoff=0;
    for (let i=0;i<e-s;i++) {//
        if (out[i]) {
            prev=out[i];
            lineoff=0;
            
        } else if (prev) {
            lineoff++;
            out[i]=prev+'.'+lineoff;
        }
    }
    return out;
}

export const enumEntries=(ptk,fn,tofind,max=100)=>{
    const keys=ptk.columns[fn]?.keys;
    if (!keys) return []
    let tf=tofind,mode=SA_MATCH_ANY;
    if (tofind.startsWith('^')) {
        tf=tofind.slice(1);
        mode=SA_MATCH_START;
    } else if (tofind.endsWith('$')) {
        tf=tofind.slice(0,tofind.length-1);
        mode=SA_MATCH_END;
    } else if (tofind.startsWith('.') && tofind.endsWith('.')) {
        tf=tofind.slice(1,tofind.length-1);
        mode=SA_MATCH_MIDDLE;
    }
    if (!tf) {
        const atarr=keys.enumMode(tf,mode,max);
        return atarr.map(it=>keys.get(it));   
    } else {
        for (let i=0;i<max;i++) {
            const t=keys.get(i);
            if (!t) break;
            out.push(t)
        }
        return out;
    }
}

export const buildYToc=(ptk,book)=>{
    const Y=ptk?.defines.y;

    if (!Y) return [];
    const ID=Y.fields.id;
    const out=[];
    const [from,to]=ptk.rangeOfAddress('bk#'+book)
    for (let i=0;i<ID.values.length;i++) {
        const linepos=Y.linepos[i]
        if (linepos<from || linepos>to) continue;
        const t=Y.getInnertext(i);
        if (t) {
            const caption='^y'+ID.values[i]+'《'+t+'》';
            const at=ptk.nearestTag( linepos+1,'dk');
            const page=parseInt(ptk.defines.dk.fields.id.values[at]);
            const line=linepos-ptk.defines.dk.linepos[at];
            out.push({caption,page,line})
        }
    }
    return out;
}

export const  pageFromPtk=(ptk,book,page)=>{
    const [s,e]=ptk.rangeOfAddress("bk#"+book+".dk#"+page);
    //assuming inmemory
    //await ptk.loadLines([s,e]);
    const lineinfo=[];    
    let yidarr=[];
    if (ptk.defines.y) {
        yidarr=yidarrInRange(ptk,s,e);
    }
    const lines=ptk.slice(s,e)
    const text=lines.join('\n');
    const locallinks=ptk.LocalBackLinks[book]||[]
    for (let i=0;i<e-s;i++) {
        lineinfo[i]={yid:yidarr[i], locallinks:locallinks[s+i] }
    }
    return [text,lineinfo,page,0]
}

export const captionOf=(ptk,addr)=>{
    if (!addr) return '';
    const [p,b,l]=parsePageBookLine(addr);
    return captionOfPage(ptk,b,p,l);
}
export const captionOfPage=(ptk,bk,page,line=0,bookname=false)=>{
    if (!ptk) return '';
    const COL=ptk.columns[bk];
    let caption='';
    if (COL && parseInt(page).toString()==page) {
        const at=COL.dkat.indexOf(parseInt(page));
        caption=COL.keys.get(at)||'';
    } 
    if (!caption) {//try yid
        const [s,e]=ptk.rangeOfAddress('bk#'+bk+'.dk#'+page);
        let tagat=ptk.nearestTag(s+1+parseInt(line),'y');
        if (~tagat) {
            while (tagat>=0 && !caption) {
                caption=ptk.defines.y.getInnertext(tagat);
                tagat--;
            }
        }
    }
    return (bookname?(ptk.BookNameById[bk]+'．') :'')+caption;
}
export const pageBookLineOfAnchor=(anchor,ptk)=>{
    const [xyidline,book]=anchor.split('@');
    let [xyid,loff]=xyidline.split('.');
    loff=parseInt(loff)||0;
    const [bookstart]=ptk.rangeOfAddress('bk#'+book);
    const [s,e]=ptk.rangeOfAddress('bk#'+book+'.y#'+xyid.slice(1));
    let bookat=ptk.nearestTag(bookstart,"dk");
    if (bookat<0) bookat=0;
    const numberpage=ptk.nearestTag(s,"dk")-bookat;
    const lineoff=s-ptk.defines.dk.linepos[numberpage]+loff;
    return numberpage+'@'+book+ (lineoff?'.'+lineoff:'');
}
export const getColumnText=(ptk,bk,key)=>{
    const col=ptk.columns[bk];
    const at=col.keys.indexOf(key);
    const dk=col.dkat[at];
    const [s,e]=ptk.rangeOfAddress('bk#'+bk+'.dk#'+dk);
    return [at,ptk.slice(s,e).join('\n')];
}
export const getSliceText=(bk,pg,ptk,getPagetText)=>{
        if (parseInt(pg).toString()==pg) {
        return ptk?pageFromPtk(ptk,bk,pg):getPageText(pg,bk);
    } else if (ptk) {
        if (pg.startsWith('x')||pg.startsWith('y')) {
            const [page,unused,line]=parsePageBookLine(pg);
            const [s,e]=ptk.rangeOfAddress('bk#'+bk+'.y#'+page.slice(1));
            const lines=ptk.slice(s,e);
            const yidarr=yidarrInRange(ptk,s,e);
            const numberpage=ptk.nearestTag(s,"dk");
            const lineoff=s-ptk.defines.dk.linepos[numberpage]
            const lineinfo=[]
            const book=ptk.nearestTag(s+1,'bk','id');
            const locallinks=ptk.LocalBackLinks[book]||[];
            for (let i=0;i<lines.length;i++) {
                lineinfo[i]={yid:yidarr[i],locallinks:locallinks[s+i]}
            }
            return [lines.join('\n'),lineinfo,numberpage, lineoff];
        } else {//fi
            if (!bk) bk=Object.keys(ptk.columns)[0];
            if (ptk.columns[bk]) {
                let [at,content]=getColumnText(ptk,bk,pg);
                const m=content.match(/@(.+)$/);
                if (m && ~ptk.columns[bk].keys.indexOf(m[1])) {
                    [at,content]=getColumnText(ptk,bk,m[1]);
                }
                return [content, {},at,0];
            }
        }
    }
    return ['',[],0]
}
