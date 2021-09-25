import { Problem } from 'src/app/pages/problem/models/problem.interface';

export interface ProblemService {
  getProblem(): Problem;
}
