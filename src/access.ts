export default function access(initialState: { authType?: String | undefined }) {
  const { authType } = initialState || {}
  return {
    canAdmin: authType === 'admin',
  };
}
