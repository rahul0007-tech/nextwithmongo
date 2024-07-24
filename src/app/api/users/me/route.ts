import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const userId=await getDataFromToken(request)
    const user = await User.findOne({_id:userId}).select("-password")
    return NextResponse.json({
        message:"User found",
        data: user
    })
}