import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };
    const hashed_password = await hash(password, 12);

    // const user = await prisma.user.create({
    //   data: {
    //     name,
    //     email: email.toLowerCase(),
    //     password: hashed_password,
    //   },
    // });
    // console.log(`🚀 ~ user:`, user);

    // return NextResponse.json({
    //   user: {
    //     name: user.name,
    //     email: user.email,
    //   },
    // });
  } catch (error: any) {
    console.log(`🚀 ~ error:`, error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
