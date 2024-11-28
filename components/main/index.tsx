"use client";

import { useEffect, useState } from "react";
import { Comment } from "@/types/mongo";
import VoteButton from "../vote-button";

import point_cursor from "@/public/point-cursor.svg";
import Image from "next/image";
import { Instagram } from "lucide-react";

import { Analytics } from "@vercel/analytics/react";
import { Skeleton } from "../ui/skeleton";

function Main() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments`);
        const result = await response.json();
        if (result.success) {
          const sortedComments = result.comments.sort(
            (a: Comment, b: Comment) => b.rate - a.rate
          );
          setComments(sortedComments);

          localStorage.setItem("buttonClicked", "true");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <>
      <Analytics />

      <div className="flex flex-col items-center w-full bg-popover">
        <section className="flex flex-col items-center max-w-maxContainer p-[10px]">
          <div className="text-[40px]">🇺🇦</div>

          <h1 className="text-center font-[700] text-[30px] leading-[30px]">
            <a
              className="underline decoration-dashed"
              href="https://www.stalker2.com/"
              target="_blank"
            >
              STALKER 2
            </a>{" "}
            - це черговий <u>доказ нашої автентичності</u>, показаний на весь
            світ
          </h1>
          <p className="text-center text-[18px] mt-[10px]">
            Проте сраки рабсіянів горять від цього.
            <br /> Тут ви можете переглянути шедевро-коментарі цих рашистів
          </p>

          <div className="flex flex-wrap justify-center items-center mt-[20px] gap-[10px]">
            <p className="font-[600]">Не забувайте донатити на нашу перемогу</p>
            <a
              className="relative flex items-center justify-center flag p-[10px] rounded-[6px] font-[700] text-[white]"
              href="https://u24.gov.ua/"
              target="_blank"
            >
              Підтримати ЗСУ
              <Image
                className="absolute w-[50px] h-[50px] right-[0px] bottom-[-25px]"
                src={point_cursor}
                alt="pointer cursor"
              />
            </a>
          </div>
        </section>

        <p
          className="text-[14px] mt-[30px] mb-[5px]"
          style={{ color: "#a6a6a6" }}
        >
          *коментарі взяті з платформи Steam
        </p>
        <div className="flex flex-col items-center w-full min-h-[100vh] max-w-maxContainer gap-[15px] p-[10px] pt-[0px]">
          {loading ? (
            <>
              {" "}
              <Skeleton className="flex justify-between w-full max-w-[600px] h-[100px] p-[20px] rounded-[10px] shadow-lg gap-[20px]" />
              <Skeleton className="flex justify-between w-full max-w-[600px] h-[100px] p-[20px] rounded-[10px] shadow-lg gap-[20px]" />
              <Skeleton className="flex justify-between w-full max-w-[600px] h-[100px] p-[20px] rounded-[10px] shadow-lg gap-[20px]" />
              <Skeleton className="flex justify-between w-full max-w-[600px] h-[100px] p-[20px] rounded-[10px] shadow-lg gap-[20px]" />
              <Skeleton className="flex justify-between w-full max-w-[600px] h-[100px] p-[20px] rounded-[10px] shadow-lg gap-[20px]" />
              <Skeleton className="flex justify-between w-full max-w-[600px] h-[100px] p-[20px] rounded-[10px] shadow-lg gap-[20px]" />
              <Skeleton className="flex justify-between w-full max-w-[600px] h-[100px] p-[20px] rounded-[10px] shadow-lg gap-[20px]" />
            </>
          ) : (
            <>
              {comments.map(({ _id, text, rate }, index: number) => (
                <div
                  className="flex justify-between w-full max-w-[600px] p-[20px] rounded-[10px] shadow-lg gap-[20px]"
                  key={`EL_${index}`}
                >
                  <p className="">{text}</p>

                  <VoteButton rate={rate} _id={_id!} />
                </div>
              ))}
            </>
          )}
        </div>

        <section className="py-[40px]">
          <div className="w-full text-center text-[40px]">🇺🇦</div>
          Любіть Україну, як сонце любіть,
          <br />
          як вітер, і трави, і води...
          <br />
          В годину щасливу і в радості мить,
          <br />
          любіть у годину негоди.
          <br />
          <br />
          Любіть Україну у сні й наяву,
          <br />
          вишневу свою Україну,
          <br />
          красу її, вічно живу і нову,
          <br />
          і мову її солов&apos;їну.
          <br />
          <br />
          Без неї — ніщо ми, як порох і дим,
          <br />
          розвіяний в полі вітрами...
          <br />
          Любіть Україну всім серцем своїм
          <br />
          і всіми своїми ділами.
          <br />
          <br />
          Для нас вона в світі єдина, одна,
          <br />
          як очі її ніжно-карі...
          <br />
          Вона у зірках, і у вербах вона,
          <br />
          і в кожному серця ударі,
          <br />
          у квітці, в пташині, в кривеньких тинах,
          <br />
          у пісні у кожній, у думі,
          <br />
          в дитячій усмішці, в дівочих очах
          <br />
          і в стягів багряному шумі...
          <br />
          <br />
          Як та купина, що горить — не згора,
          <br />
          живе у стежках, у дібровах,
          <br />
          у зойках гудків, і у хвилях Дніпра,
          <br />
          у хмарах отих пурпурових,
          <br />
          <br />
          в огні канонад, що на захід женуть
          <br />
          чужинців в зелених мундирах,
          <br />
          в багнетах, що в тьмі пробивають нам путь
          <br />
          до весен і світлих, і щирих.
          <br />
        </section>

        <a
          href="https://www.instagram.com/den.muzyka/"
          target="_blank"
          className="pb-[30px]"
        >
          <Instagram />
        </a>
      </div>
    </>
  );
}

export default Main;
