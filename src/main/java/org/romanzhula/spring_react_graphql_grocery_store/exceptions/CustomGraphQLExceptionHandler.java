package org.romanzhula.spring_react_graphql_grocery_store.exceptions;

import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.stereotype.Component;

@Component
public class CustomGraphQLExceptionHandler extends DataFetcherExceptionResolverAdapter {
    @Override
    protected GraphQLError resolveToSingleError(Throwable exception, DataFetchingEnvironment environment) {
        ErrorType currentErrorType = null;

        if (exception instanceof DataIntegrityViolationException) {
            currentErrorType = ErrorType.BAD_REQUEST;
        } else {
            currentErrorType = ErrorType.INTERNAL_ERROR;
        }

        return GraphqlErrorBuilder
                .newError(environment)
                .message("RECEIVED MESSAGE: " + exception.getMessage())
                .errorType(currentErrorType)
                .build()
        ;
    }
}
