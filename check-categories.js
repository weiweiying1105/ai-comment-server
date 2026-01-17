// Script to check the actual state of categories in the database

const { PrismaClient } = require('./prisma/src/generated/prisma');
const prisma = new PrismaClient();

async function checkCategories() {
    try {
        console.log('Checking categories in database...');
        
        // Get all categories
        const categories = await prisma.category.findMany({
            select: { id: true, name: true, use_count: true }
        });
        
        console.log('Categories found:', categories.length);
        categories.forEach(cat => {
            console.log(`  ID: ${cat.id}, Name: ${cat.name}`);
            console.log(`  Use Count Type: ${typeof cat.use_count}`);
            console.log(`  Use Count Value: ${cat.use_count}`);
            console.log(`  Is null: ${cat.use_count === null}`);
            console.log(`  Is undefined: ${cat.use_count === undefined}`);
            console.log('---');
        });
        
    } catch (error) {
        console.error('Error checking categories:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkCategories();
