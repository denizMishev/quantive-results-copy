import {
  ErrorBoundary,
  FallbackProps,
  useErrorBoundary,
} from "react-error-boundary";

export function ErrorHandler(FallbackProps) {
  const { error, resetErrorHandler } = FallbackProps;

  return (
    <section className="error-handling-ctr">
      <h1>Error!!</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorHandler}>Reload page</button>
    </section>
  );
}
