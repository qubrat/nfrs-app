import { checkConnection } from "@/config/db";
import TemplateModel from "@/models/template.model";
import { Template as TemplateType } from "@/types/template";
import Subcategory from "@/models/subcategory.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	try {
		await checkConnection();
		const templates = await TemplateModel.find();
		return NextResponse.json(templates);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Error", error }, { status: 500 });
	}
}

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const body = await req.json();

		if (!body) {
			return NextResponse.json({ message: "Invalid body" }, { status: 400 });
		}

		// Check if connection to the database is established
		await checkConnection();

		const templateData = body as TemplateType;
		// Validate content elements based on their type before creating the template
		for (const element of templateData.content) {
			if (!["text", "input", "choice", "group", "optional", "repeatable", "reference"].includes(element.elementType)) {
				return NextResponse.json({ message: "Invalid element type", element }, { status: 400 });
			}
		}
		const createdTemplate = await TemplateModel.create(templateData);

		await Subcategory.findOneAndUpdate(
			{ subcategoryId: templateData.subcategoryId },
			{ $push: { templates: createdTemplate._id } },
			{ new: true }
		);

		return NextResponse.json({ message: "Template created:", templateData }, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Error", error }, { status: 500 });
	}
}