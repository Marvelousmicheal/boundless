import React from "react";
import Image from "next/image";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  type: "default" | "comment";
}

const EmptyState = ({
  title,
  description,
  action,
  type = "default",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        {type === "default" && (
          <Image
            src="/empty/default.svg"
            alt="Empty State"
            width={100}
            height={100}
          />
        )}
        {type === "comment" && (
          <Image
            src="/empty/comment.svg"
            alt="Empty State"
            width={100}
            height={100}
          />
        )}
        <div className="space-y-1">
          <h3 className="text-xl text-white leading-[30px]">{title}</h3>
          <p className="text-sm text-white/60 leading-[145%]">{description}</p>
        </div>
      </div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;
