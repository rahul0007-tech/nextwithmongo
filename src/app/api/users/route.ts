import { NextResponse } from "next/server";
import pool from "@/app/lib/mysql";

export async function GET() {
    try {
        const db = await pool.getConnection()
        const query = 'select * from account'
        const [rows] = await db.execute(query)
        db.release()
        
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

// export async function POST() {
//     try {
//         const db = await pool.getConnection()
//         const query = 'INSERT INTO  account(email,username,password,isadmin) VALUES("abhi@gmail.com","user3","hasheeed",0)'
        
//     } catch (error) {
        
//     }
// }