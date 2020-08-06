import { vision_v1 } from './v1';
import { vision_v1p1beta1 } from './v1p1beta1';
import { vision_v1p2beta1 } from './v1p2beta1';
export declare const VERSIONS: {
    'v1': typeof vision_v1.Vision;
    'v1p1beta1': typeof vision_v1p1beta1.Vision;
    'v1p2beta1': typeof vision_v1p2beta1.Vision;
};
export declare function vision(version: 'v1'): vision_v1.Vision;
export declare function vision(options: vision_v1.Options): vision_v1.Vision;
export declare function vision(version: 'v1p1beta1'): vision_v1p1beta1.Vision;
export declare function vision(options: vision_v1p1beta1.Options): vision_v1p1beta1.Vision;
export declare function vision(version: 'v1p2beta1'): vision_v1p2beta1.Vision;
export declare function vision(options: vision_v1p2beta1.Options): vision_v1p2beta1.Vision;
