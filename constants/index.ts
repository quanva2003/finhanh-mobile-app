const isDevelop = false
const localIP = "http://192.168.1.205"
export const BASE_DOMAIN = isDevelop ? `${localIP}:3001` : "https://vncaps.com"
export const BASE_API = `${BASE_DOMAIN}/api/v1`
export const RELATIONSHIP_CODE = {
  0: "Mẹ",
  1: "Cha",
  2: "Ông",
  3: "Bà",
}
export const REASON = {
  0: "Bệnh",
  1: "Đi du lịch",
  2: "Lý do khác",
}
