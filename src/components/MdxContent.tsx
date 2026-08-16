import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 className="font-display mt-10 mb-4 text-2xl font-semibold text-ink" {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 className="font-display mt-8 mb-3 text-xl font-semibold text-ink" {...props} />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p className="mb-5 leading-relaxed text-ink-soft" {...props} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-5 list-disc space-y-2 pl-5 text-ink-soft" {...props} />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-5 list-decimal space-y-2 pl-5 text-ink-soft" {...props} />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a className="font-medium text-accent underline underline-offset-2 hover:text-accent-2" {...props} />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-6 border-l-4 border-accent bg-surface-alt py-3 pl-5 pr-4 italic text-ink-soft" {...props} />
  ),
};

export default function MdxContent({ source }: { source: string }) {
  return (
    <div className="text-[17px]">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
