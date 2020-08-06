import { cloudtasks_v2beta2 } from './v2beta2';
import { cloudtasks_v2beta3 } from './v2beta3';
export declare const VERSIONS: {
    'v2beta2': typeof cloudtasks_v2beta2.Cloudtasks;
    'v2beta3': typeof cloudtasks_v2beta3.Cloudtasks;
};
export declare function cloudtasks(version: 'v2beta2'): cloudtasks_v2beta2.Cloudtasks;
export declare function cloudtasks(options: cloudtasks_v2beta2.Options): cloudtasks_v2beta2.Cloudtasks;
export declare function cloudtasks(version: 'v2beta3'): cloudtasks_v2beta3.Cloudtasks;
export declare function cloudtasks(options: cloudtasks_v2beta3.Options): cloudtasks_v2beta3.Cloudtasks;
