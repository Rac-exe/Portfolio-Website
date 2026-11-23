// A template re-mounts on every navigation, so the entrance animation in
// globals.css (.page-enter) plays once per page view.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
