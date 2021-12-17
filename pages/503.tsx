import Error from 'next/error';

export default function ServiceUnavailable() {
  return (
    <Error statusCode={503} title='Service Unavailable' />
  );
};
