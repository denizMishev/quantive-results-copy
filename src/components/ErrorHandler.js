import {
  ErrorBoundary,
  FallbackProps,
  useErrorBoundary,
} from "react-error-boundary";

export function ErrorHandler({ error, componentStack, resetErrorBoundary }) {
  // const { error, resetErrorHandler } = FallbackProps;

  let errorType = "Server";
  if (String(error.code)[0] === "4") {
    errorType = "Request";
  }

  return (
    <main className="not-found-main">
      <section className="not-found-ctr">
        <p>
          {errorType === "Server" ? "Server error" : "Request error"}:
          {error.message}
        </p>
        <button onClick={resetErrorBoundary}>Reload page</button>
      </section>
    </main>
  );
}
