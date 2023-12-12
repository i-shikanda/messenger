import getCurrentUser from "@/app/actions/getCurrentUser";
import {NextResponse} from "next/server"
import prisma from "@/app/libs/prismadb"

export async function POST(
    request: Request
) {try {
    const currentUSer = await getCurrentUser();
    const body = await request.json();
    const {
        message,
        image,
        conversationId
    } = body;

    if (!currentUSer?.id || !currentUSer?.email) {
        return new NextResponse('Unathorised', { status: 401 });
    }

    const newMessage = await prisma.message.create({
        data: {
            body: message,
            image: image,
            conversation: {
                connect: {
                    id: conversationId
                }
            },
            sender: {
                connect: {
                    id: currentUSer.id
                }
            },
            seen: {
                connect: {
                    id: currentUSer.id
                }
            }
        },
        include: {
            seen:true,
            sender: true
        }        
    });

    const updateConversation = await prisma.conversation.update({
        where: {
            id: conversationId
        },
        data : {
            lastMessageAt: new Date(),
            messages: {
                connect: {
                    id: newMessage.id
                }
            }
        },
        include: {
            user: true,
            messages: {
                include: {
                    seen: true
                }
            }
        }
    });

    return NextResponse.json(newMessage);
} catch (error: any) {
    console.log(error, 'ERROR_MESSAGES')
    return new NextResponse('InternalError', {status: 500});
}}