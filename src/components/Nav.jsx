import { ResultsNums } from "./ResultsNums";
import { Search } from "./Search";
import { Logo } from "./Logo";

// Nav Component
export function Nav({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
