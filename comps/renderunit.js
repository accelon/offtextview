import {offTagType,  unitize} from 'ptk/offtext/parser.ts'

export const breakRenderUnit=(str)=>{
    const units=unitize(str);
    const out=units.map(text=>{
        if (text.startsWith('^') ) {
            const [t,type,offtag]=offTagType(text.slice(1))
            return {text:t,type,offtag};
        }  else {
            return {text,type:'plain',offtag:null};
        }
    });
    return out;
}