import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      id, 
      styleId, 
      styleName, 
      season, 
      fit, 
      fabricType, 
      construction, 
      components, 
      laborCost, 
      overhead 
    } = body;

    // We use an "upsert" approach so the same API works for Create and Update
    const result = await prisma.$transaction(async (tx) => {
      // 1. Delete existing components if we are updating an existing style
      if (id) {
        await tx.component.deleteMany({
          where: { styleId: id },
        });
      }

      // 2. Create or Update the Style root
      const style = await tx.style.upsert({
        where: { id: id || 'new-id' }, // If no ID, use a dummy one to trigger 'create'
        update: {
          styleId,
          styleName,
          season,
          fit,
          fabricType,
          construction,
          laborCost,
          overhead,
          // 3. Re-insert the components
          components: {
            create: components.map((c: any) => ({
              category: c.category,
              description: c.desc,
              usage: c.qty,
              unit: c.unit,
              unitCost: c.cost,
              wastage: c.waste,
            })),
          },
        },
        create: {
          styleId,
          styleName,
          season,
          fit,
          fabricType,
          construction,
          laborCost,
          overhead,
          components: {
            create: components.map((c: any) => ({
              category: c.category,
              description: c.desc,
              usage: c.qty,
              unit: c.unit,
              unitCost: c.cost,
              wastage: c.waste,
            })),
          },
        },
      });

      return style;
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}