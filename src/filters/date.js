export default function timetrans(date) {
  const newDate = new Date(date * 1000); // 如果date为13位不需要乘1000
  const Y = `${newDate.getFullYear()}-`;
  const M = `${newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1}-`;
  const D = `${newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()} `;
  return Y + M + D;
}
