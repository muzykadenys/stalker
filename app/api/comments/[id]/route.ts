import { NextRequest, NextResponse } from "next/server";
import { CommentModel } from "@/lib/models/comment";

// const list = [
//   {
//     text: "Мне светит пожизненное за ультимейт,так что скоро полностью погружусь в атмосферу Zоны в реале,передаю привет всем остальным купившим. Я обрадовался сильно, они помогли вещиi собрать и документы, сейчас едем в буханке куда-то на запад)) Вот это сервис, Григорович, Спасибо))",
//     rate: 0,
//   },
//   {
//     text: "Купил Ultimate за 110 даларов, живу в Омске) Поиграл около 15 минут и тут стук в дверь... Я обрадовался сильно, они помогли вещиi собрать и документы, сейчас едем в буханке куда-то на запад))",
//     rate: 0,
//   },
//   {
//     text: `Когда они замедлили Youtube, я молчал: я не смотрю Youtube.
//             Когда они заблокировали Discord, я молчал: я не пользуюсь Discord'ом.
//             Когда они запретили пропаганду ЛГБТ, я молчал: я не гей.
//             Затем они пришли за Stalker 2 и все поменялась.
//             Я буду смотреть Youtube!
//             Я стану пользоваться Discord'ом!
//             Я стану ге.., пожалуй хватит.`,
//     rate: 0,
//   },
//   {
//     text: "Данная копия игры приобретена в рамках развлекательного материала, денежные средства идут исключительно продавцу, любые дальнейшие манипуляции с данным средствами не несу отвественность.",
//     rate: 0,
//   },
//   {
//     text: "Я дошел до Сидоровича. Спасибо. И спасибо Скифу что подарил мне игру",
//     rate: 0,
//   },
//   { text: "ИГРАЮ В ЗОНУ, ЧТО БЫ ПОПАСТЬ НА ЗОНУ", rate: 0 },
//   { text: "Задонатил GSC Game world на бусики для ТЦК.", rate: 0 },
//   { text: "Ура скоро приеду на новое место жительства.", rate: 0 },
//   {
//     text: "Друг подшутил надо мной, я решил подшутить в ответ и подарил ему сталкер. Теперь под его дверьми стоит наряд фсб и омон",
//     rate: 0,
//   },
//   {
//     text: "Видимо у разработчиков не хватило времени, что бы довести игру до ума, но хватило времени чтобы пропихнуть в нее щепотку русофобии",
//     rate: 10,
//   },
//   {
//     text: "Отмена русской локализации, оскорбления русских игроков, поддержка ВСУ",
//     rate: 0,
//   },
//   {
//     text: "Игру очередной раз переносят и убирают русскую озвучку, при этом разработчики пафосно заявляют, что они принимают участия в боевых действиях. Я естественно возмутился и написал, что игра была не готова и СВО тут не причём",
//     rate: 6,
//   },
//   {
//     text: "минус за песню по радио Українська лють Bella Ciao. тип камон. смысл. их борьба как говорится",
//     rate: 4,
//   },
//   { text: "Украинский = не понимаю = не вылезаю из субтитров.", rate: 0 },
//   {
//     text: `Ну что могу сказать, очень плохо, так еще и без русской озвучки`,
//     rate: 0,
//   },
//   {
//     text: "ПОЛОЖИТЕЛЬНЫЙ ОТЗЫВ НЕДОСТУПЕН В ВАШЕЙ СТРАНЕ И БЫЛ ВЫРЕЗАН, КАК И РУССКАЯ ОЗВУЧКА.",
//     rate: 0,
//   },
//   {
//     text: `дойдите до локации базы долга, и в баре послушайте музыку из радио в которой напевают "Укра!нська лють (Bella Ciao Cover)"
// Я осуждаю разработчиков`,
//     rate: 0,
//   },
//   {
//     text: `Таблички советские с названиями, они старые и ржавые и тоже на укр, это решили там все заменить и сделали лаконичные старые для атмоСФЭРЫ по лору или что?`,
//     rate: 0,
//   },
//   { text: `на русском если что много в каких странах говорят, превращать играделание ) в политику фу, в каждой более менее годной игре от выходцев из "западного мира " есть русская озвучка, а украинцы решили отличится зачем)`, rate: 12 },
//   { text: `Отсутствие русской озвучки тоже очень сказывается - приходится слушать исковерканные слова`, rate: 2 },
//   { text: `Когда я зашел впервые в игру , то мне сразу же выдало , что русской озвучки нет. Очень расстроился , потому что игра стоит не две копейки , а русского нет. Геймеры никак не причастны к политике , шо це таке.`, rate: 3 },
//   { text: `Русофобское радио`, rate: 0 },
//   { text: `Лучше бы РУССКУЮ озвучку не вырезали, может быть хоть и атмосфер была бы, но ее попросту нету, и это грустно.`, rate: 4 },
//   { text: `переделывай. и русскую озвучку добавь`, rate: 0 },
//   { text: `Отдельный респект за отсутствие русской озвучки! (НЕТ) или нужно правильно сказать (НИ) :D`, rate: 4 },
// ];

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const { increment } = await req.json(); // `increment` can be positive or negative
    if (typeof increment !== "number") {
      return NextResponse.json(
        { success: false, error: "Invalid increment value" },
        { status: 400 }
      );
    }

    // await CommentModel.createMany(list);

    const updatedComment = await CommentModel.updateRate(id, increment);
    if (!updatedComment) {
      return NextResponse.json(
        { success: false, error: "Comment not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, updatedComment });
  } catch (error) {
    console.error("Error updating rate:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update rate" },
      { status: 500 }
    );
  }
}
