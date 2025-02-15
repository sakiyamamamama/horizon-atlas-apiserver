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

        <div><button onClick={()=>signIn()}>
            ログイン
          </button>
          <button onClick={()=>signOut()}>
            ログアウト
          </button>
        </div>
      </main>
    </div>
  );
}
