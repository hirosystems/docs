import { initSimnet } from "@hirosystems/clarinet-sdk-browser";
import { Cl } from "@stacks/transactions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    const simnet = await initSimnet();
    await simnet.initEmtpySession();
    simnet.setEpoch("3.0");

    const result = simnet.runSnippet(code);
    const deserializedResult = Cl.deserialize(result);
    const prettyResult = Cl.prettyPrint(deserializedResult, 2);

    return NextResponse.json({ result: prettyResult });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
