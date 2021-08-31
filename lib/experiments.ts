import { ExperimentError } from "./errors";

export interface Experiments {
  sessions: boolean;
}

export const defaults: Experiments = {
  sessions: false,
};

export function experimentRequired(
  experiments: Experiments,
  experiment: keyof Experiments
): Promise<void> {
  return new Promise((resolve, reject) => {
    experiments[experiment]
      ? resolve()
      : reject(new ExperimentError(experiment));
  });
}
