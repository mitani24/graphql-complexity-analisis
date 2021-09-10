import { ComplexityEstimator } from "graphql-query-complexity";

export const listBasedEstimator: ComplexityEstimator = ({
  field,
  args,
  childComplexity,
}) => {
  if (field.type.toString().includes("Connection")) {
    const itemLength = args.first ?? 0 + args.last ?? 0;
    return childComplexity > 0 ? itemLength * childComplexity : itemLength;
  }
  return childComplexity;
};
