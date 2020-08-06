import { IGiphy } from './igiphy';

export interface IResult {
  label: string;
  confidence: string;
  gif: IGiphy;
}
