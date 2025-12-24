import { Link } from "@tanstack/react-router";
import "./LinkButton.css";

export default function LinkButton({
  to,
  children,
  className,
}: {
  to: String;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link to={to.toString()}>
      <button className={`primary-button ${className ? className : ""}`}>
        {children}
      </button>
    </Link>
  );
}
