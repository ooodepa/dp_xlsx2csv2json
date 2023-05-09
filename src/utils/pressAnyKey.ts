import prompt from 'prompt-sync';

const myPrompt = prompt({ sigint: true });

/**
 * Функция, которая просит нажать пробел.
 * Эта функция нужна для того, чтобы не закрывалась консоль,
 * когда у нас есть готовый *.exe файл.
 */
export default function pressAnyKey() {
  console.log(' ');
  myPrompt('Для завершения программы нажмите Enter... ');
}
