import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Only available in development. Run `npm run screenshots` locally." },
      { status: 403 }
    );
  }

  const scriptPath = path.join(process.cwd(), "scripts", "capture-screens.mjs");

  return new Promise<NextResponse>((resolve) => {
    const child = spawn("node", [scriptPath], {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
    });

    const lines: string[] = [];
    child.stdout.on("data", (d: Buffer) => lines.push(d.toString()));
    child.stderr.on("data", (d: Buffer) => lines.push(d.toString()));

    child.on("close", (code: number) => {
      const output = lines.join("");
      const capturedMatch = output.match(/(\d+) captured/);
      const failedMatch = output.match(/(\d+) failed/);
      if (code === 0) {
        resolve(NextResponse.json({
          success: true,
          captured: capturedMatch ? parseInt(capturedMatch[1]) : 0,
          failed: failedMatch ? parseInt(failedMatch[1]) : 0,
          output,
        }));
      } else {
        resolve(NextResponse.json({ success: false, error: "Exit code " + code, output }, { status: 500 }));
      }
    });

    child.on("error", (err: Error) =>
      resolve(NextResponse.json({ success: false, error: err.message }, { status: 500 }))
    );
  });
}
