"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { createLoginErrorToast, createLoginSuccessToast } from "@/features/auth/utils/authToasts";
import { ROUTES } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";
import { FadeImage } from "@/components/ui/FadeImage";
import { showCustomToast } from "@/components/ui/CustomToast";
import { Spinner } from "@/components/ui/Spinner";

const AVATAR_URLS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDxyZcjijiu_JFbPoEhlvjSjprtwmJbBRfB6S1jsLWwbWY4FWgYI_mEbVhiB1Oobfb6symPZjtUIfbQKqU0bgLVUc1Rl-eC63c_MxL20zY_cWRz4WOAObF_5lwOnX8LZmAPKoHU14q2Cce5g14SpCdWNI2xmPvjL9q8f31a7wgjrOAdKAr3Vce0MLis1hC5kg4Pl0iPY-cZgFLLarN_qCv_6zzVo6Fr8hYG87p0Vef-AoZybLnW_8qHrR2t6G4xbVfp6gemgXz8iFc",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBWd4JfS28wcuerTYhijdJmzNOUSCj8Gf1S1mmgpeAaFh3tcL6CN_X6_kxN2LFUtZf6bkVnSzLPZk58yLzMHH8RoN5mqPMjfdZ8FwTcxwjE9p8PO5priGVMvzU1iHXpxwkW7_r0_GoqjA0VexPIH44TYuNgycSaqOvCd6Nw2tYxtRqbL12icuBbVzhqQFxLBMncvAaRT2dGOoneifuj8AkavGtGu5ZVFoEAQmr9RrSYgaqakXtgFkwJezzTe0DFp-32ppwF5arj_14",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDAOmdE-060AwfVVtFSMuenBRBDa31vxK7KtexoIv6dwkLdOJBwoZdNkN1mCfC7HTc3Dd6XtHBvpKMunrxeGSgDQZcKXC96aXHfMizV3WMbhBBT2E6CWpQxLbIS4otHCus0QzXdfecjPseQYw5gGB5CtJrSHFzWM8cnWNoAjpYNEeABaC7HXIeDhE-SHVxZpi3TKLhJgzPnPxJSLTTeEcTbJ0sP0JqYJNUN9Khy2ADJ7QlalJgNi5cKXZj-7sxAUBiBA1uLbVxX7Y0",
];

export function LoginForm() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      showCustomToast(createLoginSuccessToast());
      router.push(ROUTES.DASHBOARD);
    } catch (err) {
      showCustomToast(createLoginErrorToast(err instanceof Error ? err.message : undefined));
    }
  };

  return (
    <div className="glass-card w-full max-w-96 overflow-hidden rounded-xl shadow-lg md:max-w-[1000px]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Hero panel — desktop only */}
        <div className="relative hidden min-h-[600px] overflow-hidden md:block">
          <FadeImage
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnuWjQEBcHnaEc0dmIET6Vmk7wxxeTBDoIHqnUeiCGwqvwwM_0CzbUDBOEFNpiKu7jUyk5Y7Oak9s8qC8nhYEykUfSf8nzlFCfQlpgrjO7oa8k3CXkwVUUuTn4rqzYb7l5Nslr89QQ0DtG3FNNpYgIkSqy-HE5QPSXY0yUeDm7M3UnT4UZkMt7YyPvhIG15UF9cBK8uENP3aKovTAhkNt0_wRXphlUlofmpfXgfoYuR3vc4zNMd3g_76yZg65-GZzj9umLrLFBFlA"
            alt="Financial Wellness"
            fill
            sizes="(min-width: 768px) 500px, 0px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-xl text-white">
            <h2 className="mb-xs text-2xl font-semibold">
              Your Journey to Financial Wellness
            </h2>
            <p className="max-w-96 text-sm opacity-90">
              Join thousands of users who have simplified their tracking and
              reclaimed control over their financial future.
            </p>
            <div className="mt-md flex items-center gap-sm">
              <div className="flex -space-x-2">
                {AVATAR_URLS.map((src, i) => (
                  <div
                    key={src}
                    className="h-8 w-8 overflow-hidden rounded-full border-2 border-primary bg-surface-container"
                  >
                    <FadeImage
                      src={src}
                      alt={`User ${i + 1}`}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="self-center text-sm text-on-primary-container">
                4.9/5 User Rating
              </span>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="flex flex-col justify-center bg-surface-container-lowest p-lg md:p-xl">
          <div className="mx-auto w-full max-w-96">
            {/* Icon badge — mobile only */}
            <div className="mb-md flex justify-center md:hidden">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-on-primary shadow-lg">
                <Icon name="account_balance_wallet" className="!text-3xl" filled />
              </div>
            </div>

            <header className="mb-xl text-center md:text-left">
              <h1 className="mb-xs text-3xl font-bold tracking-tight text-primary md:font-bold md:text-on-surface">
                Welcome back
              </h1>
              <p className="text-sm text-on-surface-variant">
                Please enter your details to sign in.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-md">
              <div className="space-y-xs">
                <label
                  htmlFor="email"
                  className="block px-xs text-xs font-semibold uppercase tracking-wider text-on-surface-variant md:px-0"
                >
                  Email Address
                </label>
                <div className="relative flex items-center rounded-lg border border-outline-variant bg-surface-container-lowest transition-all focus-within:border-primary md:bg-surface-container-low">
                  <Icon name="mail" className="absolute left-3 !text-xl text-outline md:left-md md:text-base" />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-none bg-transparent py-3 pl-10 pr-3 text-sm focus:ring-0 md:py-sm md:pl-11 md:pr-md"
                    required
                  />
                </div>
              </div>

              <div className="space-y-xs">
                <div className="flex items-center justify-between px-xs md:px-0">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
                  >
                    Password
                  </label>
                  <Link href="#" className="text-xs font-semibold text-primary hover:underline md:text-sm">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative flex items-center rounded-lg border border-outline-variant bg-surface-container-lowest transition-all focus-within:border-primary md:bg-surface-container-low">
                  <Icon name="lock" className="absolute left-3 !text-xl text-outline md:left-md md:text-base" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-none bg-transparent py-3 pl-10 pr-12 text-sm focus:ring-0 md:py-sm md:pl-11 md:pr-md"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 text-outline transition-colors hover:text-on-surface-variant md:right-md md:hover:text-primary"
                  >
                    <Icon name={showPassword ? "visibility_off" : "visibility"} className="!text-xl md:text-sm" />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-lg flex w-full items-center justify-center gap-base rounded-lg bg-primary py-3.5 text-lg font-semibold text-on-primary shadow-md transition-all hover:bg-primary-container hover:shadow-lg active:scale-[0.98] disabled:opacity-60 md:py-sm md:text-lg md:text-white md:shadow-lg"
              >
                {isLoading && <Spinner size="sm" />}
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <Icon name="arrow_forward" className="!text-xl md:hidden" />}
              </button>

              {/* future work for google/apple login */}
              {/* <div className="relative flex items-center py-md">
                <div className="flex-grow border-t border-outline-variant" />
                <span className="mx-md flex-shrink text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-outline-variant" />
              </div>
              <div className="grid grid-cols-2 gap-sm">
                <button
                  type="button"
                  className="flex items-center justify-center gap-xs rounded-lg border border-outline-variant bg-white py-sm text-sm text-on-surface transition-colors hover:bg-surface active:scale-[0.98]"
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
                  className="flex items-center justify-center gap-xs rounded-lg border border-outline-variant bg-white py-sm text-sm text-on-surface transition-colors hover:bg-surface active:scale-[0.98]"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.22 16.8 4.22 10.62 7.7 10.3c1.08.06 1.83.63 2.5.63.66 0 1.77-.73 3.12-.58 1.4.15 2.45.75 3.02 1.6-2.8 1.55-2.35 5.2.45 6.34-.58 1.44-1.34 2.8-2.74 4zM12.03 9.4c-.1-.02-.15-.02-.2 0-2.33-.18-3.05-2.73-2.93-4.52 2.22.1 3.53 2.13 3.13 4.52z"
                      fill="currentColor"
                    />
                  </svg>
                  Apple
                </button>
              </div> */}
            </form>

            <p className="mt-xl text-center text-sm text-on-surface-variant md:text-left">
              Don&apos;t have an account?{" "}
              <Link href={ROUTES.SIGN_UP} className="font-bold text-primary hover:underline">
                Sign up for free
              </Link>
            </p>

            {/* Trust bar — mobile only */}
            <div className="mt-xl flex items-center gap-md rounded-xl border border-outline-variant/50 bg-surface-container-high/50 p-md md:hidden">
              <div className="flex -space-x-2">
                {AVATAR_URLS.slice(0, 2).map((src, i) => (
                  <div
                    key={src}
                    className="h-8 w-8 overflow-hidden rounded-full border-2 border-surface bg-surface-container"
                  >
                    <FadeImage src={src} alt={`User ${i + 1}`} width={32} height={32} className="h-full w-full object-cover" />
                  </div>
                ))}
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-secondary-container text-[10px] font-bold text-on-secondary-container">
                  +2k
                </div>
              </div>
              <p className="text-xs leading-tight text-on-surface-variant">
                Join <span className="font-bold">2,400+</span> users tracking their expenses today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
