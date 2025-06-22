import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] relative min-h-screen">
      <div className="h-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Logo>Desi Home</Logo>

            <h2 className="mt-6 text-3xl font-extrabold text-[var(--foreground)]">
              Looking for something?
            </h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              We&apos;re sorry. The Web address you entered is not a functioning
              page on our site.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="rounded-md space-y-4">
              <Link
                href="/"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-[var(--primary-foreground)] bg-[var(--primary)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ring)]"
              >
                Go to Desi Home&apos;s home page
              </Link>

              <Link
                href="/help"
                className="w-full flex items-center justify-center px-4 py-2 border border-[var(--border)] text-sm font-semibold rounded-md text-[var(--primary)] bg-[var(--background)] hover:bg-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]"
              >
                Help
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--muted-foreground)]">
              Need help? Visit the{" "}
              <Link
                href="/help"
                className="font-medium text-[var(--primary)] hover:underline"
              >
                Help section
              </Link>{" "}
              or{" "}
              <Link
                href="/contact"
                className="font-medium text-[var(--primary)] hover:underline"
              >
                contact us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
