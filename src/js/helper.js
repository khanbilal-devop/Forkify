import { TIME_OUT_SECONDS } from "./constant";


export const timeout = (s) => {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};


export const getJson = async (url) => {
   const response = await Promise.race([fetch(url), timeout(TIME_OUT_SECONDS)]);
    // 5ed6604591c37cdc054bc880
    const data = await response.json();
    if (!response.ok) throw new Error(`Status : ${response?.status} \n${data?.message}`)
    return data;
}