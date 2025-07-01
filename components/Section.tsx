// components/ui/Section.tsx
import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <section className="py-12 px-4 md:px-16">
      <div className="flex items-center justify-center mb-10">
        <div className="flex items-center justify-center w-full">
          <span className="flex-grow h-px bg-foreground/10" />
          <h2 className="px-4 text-xl md:text-2xl font-semibold text-center text-primary whitespace-nowrap">
            {title}
          </h2>
          <span className="flex-grow h-px bg-foreground/10" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
};

export default Section;
