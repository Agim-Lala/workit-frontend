// Shape of the API's error response body (see Workit.Api/Common/Routing/ApiExceptionWriter.cs).
// The HTTP status code itself is not repeated in the body — read it off the axios response.
export type ApiError = {
  title: string
  detail?: string
  errors?: Record<string, string[]>
}
