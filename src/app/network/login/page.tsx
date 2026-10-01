import NetworkAccountLinks from "@/components/NetworkAccountLinks";
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
            Buy from Diamond Capital Africa
          </p>
          <h1 className="mt-2 text-3xl font-bold">Buyer sign in</h1>
          <div className="mt-6 flex justify-center">
            <NetworkAccountLinks current="/network/login" />
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <NetworkLoginForm />
      </div>
    </>
  );
}