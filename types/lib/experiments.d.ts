export interface Experiments {
    sessions: boolean;
}
export declare const defaults: Experiments;
export declare function experimentRequired(experiments: Experiments, experiment: keyof Experiments): Promise<void>;
