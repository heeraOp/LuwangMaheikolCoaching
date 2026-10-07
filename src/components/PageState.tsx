export function PageLoading({ text = 'Loading…' }: { text?: string }) {
  return <div className="card" style={{ padding: 28, textAlign: 'center' }}><p className="muted">{text}</p></div>
}
export function PageError({ message }: { message: string }) {
  return <div className="card" style={{ padding: 28 }}><h3>Unable to load this section</h3><p className="muted">{message}</p></div>
}
