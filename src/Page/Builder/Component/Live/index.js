import React from "react";
import Container from "./Container";
import ErrorBoundary from "../../../../Common/Component/ErrorBoundary";

export default function(props) {
  return (
    <ErrorBoundary>
      <Container {...props} />
    </ErrorBoundary>
  );
}
