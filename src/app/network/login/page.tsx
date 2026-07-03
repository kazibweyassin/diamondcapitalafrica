import NetworkLoginForm from "@/components/NetworkLoginForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Institutional Portal Sign In",
  description: "Sign in to the Diamond Capital Africa Institutional Gold Network portal.",
  path: "/network/login",
});

export default function NetworkLoginPage() {
  return (
    <>
      <section className="bg-primary py-12 text-white md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Verified Gold Exchange
          </p>
          <h1 className="mt-2 text-3xl font-bold">Institutional portal</h1>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <NetworkLoginForm />
      </div>
    </>
  );
}