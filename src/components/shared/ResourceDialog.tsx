import { useEffect } from "react";
import "./ResourceDialog.css";

interface Resource {
  label: string;
  url: string;
}

interface ResourceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  skillName: string;
  resources?: Resource[];
}

export default function ResourceDialog({
  isOpen,
  onClose,
  skillName,
  resources = [],
}: ResourceDialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="resource-dialog-overlay" onClick={onClose}>
      <div
        className="resource-dialog-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="resource-dialog-header">
          <h2 className="resource-dialog-title">
            Resources for <span className="text-primary">{skillName}</span>
          </h2>
          <button
            className="resource-dialog-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="resource-dialog-body">
          {resources.length > 0 ? (
            <ul className="resource-list">
              {resources.map((resource, index) => (
                <li key={index} className="resource-item">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    <span>{resource.label}</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-resources">
              No links available for this skill yet.
            </p>
          )}
        </div>

        <div className="resource-dialog-footer">
          <button className="resource-dialog-done" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
