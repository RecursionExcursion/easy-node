import { NextRequest, NextResponse } from "next/server";
import { getScriptGenInfo } from "../../../service/scriptService";
import { Service } from "../../../types/apiResponse";

export const POST = async (req: NextRequest) => {
    console.log("hi");
    
  const apiServices = await getScriptGenInfo();
  const services = apiServices.services as Service[];
  return Response.json({ services });
};
