import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function () {
    return await getServerSession(authOptions);
}