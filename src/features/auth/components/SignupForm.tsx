"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { createSignupErrorToast, createSignupSuccessToast } from "@/features/auth/utils/authToasts";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";
import { FadeImage } from "@/components/ui/FadeImage";
import { showCustomToast } from "@/components/ui/CustomToast";
import { Spinner } from "@/components/ui/Spinner";

const AVATAR_URLS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA_nQPLj7pLf4ffKnATGly552VdEuD7DK5iGpxjXJ-sScWM3MjWMVoQmBElkcXJD0z1Lngd_gScaKOlNfzJQj0Ew-KCBk_fek98jNuLndriZM5bsrjTYmg8n17pkkdtQgUOhI5gwlf-MalE_qND8XtENu857tbs8K1u_QEkh1V9ZrUDeF2L6dkpd1yF6nvoQMt-betwJmA1tSJoAvEKwmh0KJdAy2QImp3Mp_lbfGpfZQpGbA_0JN_mYMWnTaDB9cS2OXCwuhAw1Tg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB0QT98xWDOJEJ3meEQ8t9mWyw1qyZ15X0V5d8UamvXx7AX3JOyLl4VLy1IYQB9JP6Z6WBjgeJ3eh4GWAmtot6pFIPfsJwasXEhP7607miaAtJY6a16OTn_YcnMm3MJft-kH_mJObXplrSg5itqNq3PKT4bhnLEqKmuINEfG1hxPJEGaAEpodK3A8ECVVMOxw-xTqt_ppEqRz9z5AUlUSPwrioI8jbBYsw5jSa-B4xUS3OhcRNcwQesWsSUA86s1xC9Zon4gkbu92k",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCZGKXaiJYbvPCdsznSId2bgeiZ2XENCfdaClO7W593DAuSICgd_X-bKB_sgvzs9rDl34j8YK4m525DltmWPZEnGNXHDspEoLBO2NcAybJ7Hn256iTOSWtu74JGRKJrTLN19uHPd2AoVF5y08zqjux7arN-OmWobppwwRlHYK7VwqN0SLNiWQ4OopQwPbStPk9Az46ifoAukmwax40DjXC0Qvh3DXcea94WfRIZlm72dlKwkHSnDObxPDk9IvxsFFaall2SPQ1neSI",
];

export function SignupForm() {
  const { signup, isLoading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showCustomToast(createSignupErrorToast("Passwords do not match"));
      return;
    }
    try {
      await signup({ name, email, password });
      showCustomToast(createSignupSuccessToast());
      router.push(ROUTES.DASHBOARD);
    } catch (err) {
      showCustomToast(createSignupErrorToast(err instanceof Error ? err.message : undefined));
    }
  };

  return (
    <main className="min-h-screen bg-surface-bright md:flex md:flex-row md:bg-surface">
      {/* Mobile-only top bar — desktop shows branding in the promo panel instead */}
      <header className="fixed left-0 top-0 z-40 flex h-16 w-full items-center px-container-margin md:hidden">
        <span className="text-2xl font-extrabold text-primary">{APP_NAME}</span>
      </header>

      {/* Promo panel — desktop only */}
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary-container p-xl md:flex">
        <div className="pointer-events-none absolute inset-0 h-full w-full opacity-20">
          <svg
            className="h-full w-full scale-150 -translate-y-1/4 translate-x-1/4 transform"
            viewBox="0 0 400 400"
          >
            <path
              d="M47.5,-63.2C61.4,-54.6,72.4,-41.3,77.7,-26.4C83,-11.5,82.5,4.9,77.3,19.3C72.1,33.7,62.2,46.1,49.5,55.5C36.8,64.9,21.3,71.4,4.5,65.3C-12.3,59.1,-30.3,40.3,-43.3,23.3C-56.3,6.3,-64.3,-8.9,-61.8,-22.9C-59.2,-36.8,-46.2,-49.5,-32.1,-58C-17.9,-66.6,-2.6,-71,12.7,-68.8C27.9,-66.6,47.5,-63.2,47.5,-63.2Z"
              fill="white"
              transform="translate(200 200)"
            />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="mb-xl flex items-center gap-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
              <Icon name="account_balance_wallet" className="text-primary-container" filled />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">{APP_NAME}</span>
          </div>
          <div className="max-w-112">
            <h1 className="mb-md text-4xl font-bold text-white">
              Master your money with professional clarity.
            </h1>
            <p className="mb-xl leading-relaxed text-on-primary-container opacity-90">
              Join a community dedicated to financial wellness. Track every
              cent, plan every goal, and achieve lasting peace of mind.
            </p>
            <div className="inline-flex flex-col gap-sm rounded-xl border border-white/20 bg-white/10 p-md backdrop-blur-md">
              <div className="flex -space-x-2">
                {AVATAR_URLS.map((src, i) => (
                  <div
                    key={src}
                    className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary-container"
                  >
                    <FadeImage
                      src={src}
                      alt={`User ${i + 1}`}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-container bg-secondary text-xs font-bold text-white">
                  2.4k+
                </div>
              </div>
              <p className="text-sm text-primary-fixed">
                Join 2,400+ users building wealth today.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-auto">
          <div className="card-shadow ml-auto max-w-96 translate-y-8 transform rounded-2xl bg-white p-lg">
            <div className="mb-md flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Monthly Growth
              </span>
              <Icon name="trending_up" className="text-secondary" filled />
            </div>
            <div className="mb-md flex h-32 items-end gap-xs">
              <div className="h-1/3 w-full rounded-t-sm bg-surface-variant" />
              <div className="h-1/2 w-full rounded-t-sm bg-surface-variant" />
              <div className="h-2/3 w-full rounded-t-sm bg-surface-variant" />
              <div className="h-4/5 w-full rounded-t-sm bg-primary-container" />
              <div className="h-full w-full rounded-t-sm bg-secondary" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant">Total Savings</span>
                <span className="text-xl font-bold text-on-surface">$12,840.00</span>
              </div>
              <div className="rounded-full bg-secondary/10 px-sm py-xs text-xs font-bold text-secondary">
                +12.5%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form panel */}
      <section className="flex w-full justify-center px-md py-xl md:w-1/2 md:items-center md:p-xl">
        <div className="mx-auto mt-24 w-full max-w-96 md:mt-0 md:max-w-112">
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm md:border-none md:bg-transparent md:p-0 md:shadow-none">
            <div className="mb-xl">
              <h1 className="mb-xs text-3xl font-bold text-on-surface">Create Account</h1>
              <p className="text-sm text-on-surface-variant">
                Start your journey to financial wellness today.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-md md:space-y-md md:gap-0">
              <div className="flex flex-col gap-xs">
                <label
                  htmlFor="name"
                  className="px-1 text-xs font-semibold uppercase tracking-wider text-on-surface-variant md:ml-xs md:px-0"
                >
                  Full Name
                </label>
                <div className="group relative">
                  <Icon
                    name="person"
                    className="absolute left-3 top-1/2 -translate-y-1/2 !text-xl text-outline transition-colors md:left-md md:!text-base md:group-focus-within:text-primary"
                  />
                  <input
                    id="name"
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border-none bg-surface-container py-3 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary-container md:border md:border-outline-variant md:bg-white md:py-sm md:pl-11 md:focus:border-primary md:focus:ring-0"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label
                  htmlFor="email"
                  className="px-1 text-xs font-semibold uppercase tracking-wider text-on-surface-variant md:ml-xs md:px-0"
                >
                  Email Address
                </label>
                <div className="group relative">
                  <Icon
                    name="mail"
                    className="absolute left-3 top-1/2 -translate-y-1/2 !text-xl text-outline transition-colors md:left-md md:!text-base md:group-focus-within:text-primary"
                  />
                  <input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border-none bg-surface-container py-3 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary-container md:border md:border-outline-variant md:bg-white md:py-sm md:pl-11 md:focus:border-primary md:focus:ring-0"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-md md:grid-cols-2">
                <div className="flex flex-col gap-xs">
                  <label
                    htmlFor="password"
                    className="px-1 text-xs font-semibold uppercase tracking-wider text-on-surface-variant md:ml-xs md:px-0"
                  >
                    Password
                  </label>
                  <div className="group relative">
                    <Icon
                      name="lock"
                      className="absolute left-3 top-1/2 -translate-y-1/2 !text-xl text-outline transition-colors md:left-md md:!text-base md:group-focus-within:text-primary"
                    />
                    <input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border-none bg-surface-container py-3 pl-10 pr-12 text-sm outline-none transition-all focus:ring-2 focus:ring-primary-container md:border md:border-outline-variant md:bg-white md:py-sm md:pl-11 md:pr-md md:focus:border-primary md:focus:ring-0"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-xs">
                  <label
                    htmlFor="confirmPassword"
                    className="px-1 text-xs font-semibold uppercase tracking-wider text-on-surface-variant md:ml-xs md:px-0"
                  >
                    Confirm Password
                  </label>
                  <div className="group relative">
                    <Icon
                      name="lock_reset"
                      className="absolute left-3 top-1/2 -translate-y-1/2 !text-xl text-outline transition-colors md:left-md md:!text-base md:group-focus-within:text-primary"
                    />
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-xl border-none bg-surface-container py-3 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary-container md:border md:border-outline-variant md:bg-white md:py-sm md:pl-11 md:focus:border-primary md:focus:ring-0"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-xs flex items-start gap-sm md:pt-xs">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-outline-variant text-primary-container focus:ring-primary-container md:text-primary md:focus:ring-primary/20"
                  required
                />
                <label htmlFor="terms" className="text-xs leading-relaxed text-on-surface-variant">
                  I agree to the{" "}
                  <Link href="#" className="font-semibold text-primary-container hover:underline md:font-bold md:text-primary">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="font-semibold text-primary-container hover:underline md:font-bold md:text-primary">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group mt-md flex w-full items-center justify-center gap-sm rounded-xl bg-primary-container py-4 text-lg font-semibold text-on-primary shadow-sm transition-all active:scale-95 disabled:opacity-60 md:py-md md:text-white md:shadow-lg md:hover:shadow-xl"
              >
                {isLoading && <Spinner size="sm" />}
                {isLoading ? "Creating account..." : "Create Account"}
                {!isLoading && (
                  <Icon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
                )}
              </button>

              <div className="relative flex items-center py-xs md:py-md">
                <div className="flex-grow border-t border-outline-variant" />
                <span className="mx-4 flex-shrink text-xs font-semibold uppercase tracking-wider text-outline md:mx-md md:text-on-surface-variant">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-outline-variant" />
              </div>

              <div className="grid grid-cols-2 gap-sm md:gap-md">
                <button
                  type="button"
                  className="flex items-center justify-center gap-sm rounded-xl border border-outline-variant bg-surface-container-low py-3 text-sm font-semibold transition-colors hover:bg-surface-container active:scale-95 md:bg-white md:font-normal md:text-on-surface md:hover:bg-surface-container"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-sm rounded-xl border border-outline-variant bg-surface-container-low py-3 text-sm font-semibold transition-colors hover:bg-surface-container active:scale-95 md:bg-white md:font-normal md:text-on-surface md:hover:bg-surface-container"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.365 1.43c-1.14 1.35-1.908 3.21-1.698 5.07 1.632.126 3.588-.816 4.698-2.13 1.11-1.32 1.848-3.234 1.584-5.016-1.74.066-3.444.726-4.584 2.076zm.126 5.64c-2.43 0-4.506 1.44-5.694 1.44-1.194 0-3.006-1.362-5.028-1.362-2.628 0-5.052 1.488-6.408 3.828-2.73 4.704-.702 11.646 1.956 15.486 1.302 1.872 2.844 3.972 4.884 3.906 1.968-.072 2.712-1.26 5.082-1.26s3.042 1.26 5.118 1.224c2.106-.036 3.438-1.908 4.728-3.792 1.494-2.178 2.106-4.296 2.13-4.41-.048-.018-4.092-1.572-4.134-6.222-.042-3.876 3.168-5.742 3.312-5.832-1.8-2.634-4.566-2.934-5.544-2.97z" />
                  </svg>
                  Apple
                </button>
              </div>
            </form>

            <div className="mt-xl text-center">
              <p className="text-sm text-on-surface-variant">
                Already have an account?{" "}
                <Link href={ROUTES.LOGIN} className="font-bold text-primary-container hover:underline md:text-primary">
                  Log In
                </Link>
              </p>
            </div>
          </div>

          {/* Mobile-only trust footer */}
          <footer className="mt-lg px-md text-center md:hidden">
            <p className="text-xs font-semibold uppercase tracking-wider text-outline">
              Secure 256-bit SSL encryption
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
