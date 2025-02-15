import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";


export default function Home() {
  const {data:session} = useSession()
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

        <div>
          {!session && <button onClick={()=>signIn()}>
            ログイン
          </button>}
          {session && <button onClick={()=>signOut()}
          >
            ログアウト
          </button>}
        </div>
      </main>
    </div>
  );
}
