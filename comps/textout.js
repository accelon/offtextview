import {toSim} from 'lossless-simplified-chinese';
export const _=(t,sim=0)=>{
    return sim?toSim(t,sim):t;
}