import {toSim} from 'lossless-simplified-chinese';
export const _=(t,sim=0)=>{
    return sim?toSim(t,sim):t;
}

export const getLangClass=(lang,trans='')=>{
    if (lang=='zh') return '';
    else if (lang=='en') return ' lang-en';
    else if (lang=='pp') return ' lang-pp-'+trans;
}
export const textClasses=ptk=>{
	if (!ptk) return '';
	let out=' '+ptk.name;
	if (ptk.lang=='pp') { // pp : provident pali, pli : romanize pali
		const trans=get(palitrans);
		if (trans=='iast') out+=' '+ptk.name+'-iast';
	}
	return out;
}