/**
 * Функция получает дату в формета 'YY-MM-DD_hh-mm-ss'
 * @param {*} d
 * @returns 'YY-MM-DD_hh-mm-ss'
 */
export default function getTime(d = new Date()) {
  const ye = d.getFullYear();

  const tmo = d.getMonth() + 1;
  const mo = tmo < 10 ? `0${tmo}` : `${tmo}`;

  const tda = d.getDate();
  const da = tda < 10 ? `0${tda}` : `${tda}`;

  const tho = d.getHours();
  const ho = tho < 10 ? `0${tho}` : `${tho}`;

  const tmi = d.getMinutes();
  const mi = tmi < 10 ? `0${tmi}` : `${tmi}`;

  const tms = d.getSeconds();
  const ms = tms < 10 ? `0${tms}` : `${tms}`;

  return `${ye}-${mo}-${da}_${ho}-${mi}-${ms}`;
}
