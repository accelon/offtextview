export const parseEntry=t=>{
    if (t.charAt(0)=='^') t=t.slice(1)
    const at=t.indexOf('|');
    if (at==-1) {
        return [t,t];
    } else {
        return [ t.slice(0,at),t.slice(at+1)]
    }
}