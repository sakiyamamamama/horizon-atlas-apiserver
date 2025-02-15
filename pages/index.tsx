import Image from "next/image";
import { signIn, signOut } from "next-auth/react";


export default function Home() {
  return (
    <div className="mt-5 mr-5"
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              pages/index.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div>
          <button onClick={()=>signIn()}>
            ログイン
          </button>
          <button onClick={()=>signOut()}
          >
            ログアウト
          </button>
        </div>
      </main>
    </div>
  );
}
