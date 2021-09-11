import {
  ComplexityEstimator,
  simpleEstimator,
  directiveEstimator,
  fieldExtensionsEstimator,
} from "graphql-query-complexity";

const connectionsEstimator = (): ComplexityEstimator => {
  return ({ field, args, childComplexity }) => {
    const typeName = field.type.toString();
    if (typeName.endsWith("Connection") || typeName.endsWith("Connection!")) {
      const length = Math.max(args.first ?? 0, args.last ?? 0);
      return childComplexity > 0 ? length * childComplexity : length;
    }
    return;
  };
};

export {
  simpleEstimator,
  directiveEstimator,
  fieldExtensionsEstimator,
  connectionsEstimator,
};
