import { PluginDefinition } from "apollo-server-core";
import { GraphQLError, separateOperations } from "graphql";
import {
  getComplexity,
  QueryComplexityOptions,
} from "graphql-query-complexity";

type ComplexityPluginOptions = Pick<
  QueryComplexityOptions,
  "maximumComplexity" | "estimators" | "onComplete" | "createError"
>;

export const queryComplexityPlugin = ({
  maximumComplexity,
  estimators,
  onComplete,
  createError = (max, actual) =>
    new GraphQLError(
      `Query too complex. Value of ${actual} is over the maximum ${max}.`
    ),
}: ComplexityPluginOptions): PluginDefinition => {
  return {
    async requestDidStart({ schema }) {
      return {
        async didResolveOperation({ request, document }) {
          const query = request.operationName
            ? separateOperations(document)[request.operationName]
            : document;

          const complexity = getComplexity({
            schema,
            query,
            variables: request.variables,
            estimators,
          });

          if (onComplete) {
            await onComplete(complexity);
          }

          if (complexity >= maximumComplexity) {
            throw await createError(maximumComplexity, complexity);
          }
        },
      };
    },
  };
};
