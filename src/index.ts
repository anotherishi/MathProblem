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

const body = '<!DOCTYPE html><html lang="en">    <head>        <meta charset="UTF-8" />        <meta http-equiv="X-UA-Compatible" content="IE=edge" />        <meta name="viewport" content="width=device-width, initial-scale=1.0" />        <title>A Maths Problem</title>        <link rel="shortcut icon" href="data:" type="image/x-icon" />        <style>            * {                margin: 0;                padding: 0;                box-sizing: border-box;                font-family: monospace;                line-height: 1.3em;            }            main {                height: 90vh;                display: flex;                flex-direction: column;                align-items: center;                justify-content: space-evenly;            }            h1 {                font-size: 2.3em;                text-decoration: underline;                text-decoration-style: wavy;                text-underline-offset: 4px;            }            form {                font-size: 1.5em;                margin: 2vh 4vw;            }            input#inp {                font-weight: bold;                padding: 0.1vh 1vw;                width: 6ch;                font-size: 1.1em;            }            button#btn {                float: right;                margin-right: 10vw;                font-weight: bold;                padding: 0.3vh 1vw;                font-size: 1.1em;            }            div#qp {                font-weight: bold;                margin-left: 5vw;            }            #op-wrapper {                width: 40vw;                min-height: 10vh;                font-size: 1.5em;            }          #output {                float: right;            }            b {                font-size: 1.1em;                float: left;            }        </style>    </head>    <body>        <main>            <h1>A Maths Problem</h1>            <form autocomplete="off" id="prblm"> <b>Q)</b>&nbsp; How many <input type="number" value="4" min="2" id="inp" /> digit numbers                can we write so that                <div id="qp">                    1<sup>st</sup> digit is the number of 0s,                    <br />                    2<sup>nd</sup> digit is the number of 1s,                    <br />                    3<sup>rd</sup> digit is the number of 2s, <br />                    4<sup>th</sup> digit is the number of 3s, <br />                </div>                in the number.                <br /><br />                <button type="submit" id="btn">Find!</button>            </form>            <div id="op-wrapper">                <div id="op-inf"></div>                <ol type="a" id="output"></ol>            </div>        </main>        <script>            const digInp = document.getElementById("inp");            const qp = document.getElementById("qp");            let op = document.getElementById("output");            let opw = document.getElementById("op-inf");            digInp.oninput = () => {                qp.innerHTML = "";                for (let i = 0; i < +digInp.value; i++)                    qp.innerHTML += `${cardNum(                        (i + 1).toString()                    )} digit is the number of ${i}s, <br />`;            };            document.getElementById("btn").onclick = async function (clickEvent) {                clickEvent.preventDefault();                this.disabled = true;                op.innerHTML=""                opw.innerHTML = "<h3>Calculating...</h3>";                val = digInp.value;                let arr = await (await fetch(val)).json();                let dt = "";                if (arr.length)                    arr.forEach((r) => {                        dt += `<li>${r}</li>`;                    });                op.innerHTML = dt;                opw.innerHTML = `<h3 width="100vw" align="left">Answer:</div>`;                opw.innerHTML += dt ? "" : "<h3>Not Possible!!</h3>";                this.disabled = false;                return false;            };            const d = { 1: "st", 2: "nd", 3: "rd" };            function cardNum(num) {                if (!/(11|12|13)$/g.test(num) && /[123]$/g.test(num))                    return num + `<sup>${d[num.slice(-1)]}</sup>`;                return num + "<sup>th</sup>";            }        </script>    </body></html>';

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
    console.log(__dirname)
    return new Response(await Deno.readFile(__dirname + "/index.html"), {
        status: 200,
        headers: {
            "content-type": "text/html; charset=utf-8",
        },
    });
}

serve(handler, { port: +(Deno.env.get("PORT") ?? "8000") });
