import { speech_v1 } from './v1';
import { speech_v1beta1 } from './v1beta1';
export declare const VERSIONS: {
    'v1': typeof speech_v1.Speech;
    'v1beta1': typeof speech_v1beta1.Speech;
};
export declare function speech(version: 'v1'): speech_v1.Speech;
export declare function speech(options: speech_v1.Options): speech_v1.Speech;
export declare function speech(version: 'v1beta1'): speech_v1beta1.Speech;
export declare function speech(options: speech_v1beta1.Options): speech_v1beta1.Speech;
