function listAll(dig: number): String[] {
    let arr = [];
    let maxnum = [dig - 2];
    let digm1 = dig - 1;
    for (let i = 1; i < dig; i++) maxnum.push(digm1);
    let mn = +maxnum.join("");
    for (let i = 0; i < mn; i++) {
        let cd = i.toString().padStart(dig, "0");
        if (numcheck(cd, dig)) arr.push(cd);
    }
    return arr;
}
function numcheck(num: string, dig: number): Boolean {
    if (num[0] === "0" || new RegExp(`[^0-${dig - 1}]`).test(num)) return false;
    for (let i = 0; i < num.length; i++) if (count(num, i.toString()) != +num[i]) return false;
    return true;
}

function count(s: string, v: string): number{
    return (s.match(new RegExp(v, "g")) || []).length;
}


// ====================================================================

import { serve } from "https://deno.land/std@0.130.0/http/server.ts";

async function handler(req: Request): Promise<Response> {
    const endp = req.url.split("/").slice(3)[0];
    if (endp) {
        let arr = await listAll(+endp);
        return new Response(JSON.stringify(arr), {
            status: 200,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
        });
    }
    const body = await Deno.readFile("index.html");
    return new Response(body, {
        status: 200,
        headers: {
            "content-type": "text/html; charset=utf-8",
        },
    });
}

serve(handler, { port: +(Deno.env.get("PORT") ?? "8000") });
