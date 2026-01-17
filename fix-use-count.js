// Script to fix undefined use_count values in existing categories
// Run this script once to update all existing records

const { PrismaClient } = require('./prisma/src/generated/prisma');
const prisma = new PrismaClient();

// Function to update all categories with undefined use_count to 0
async function fixUseCount() {
    try {
        console.log('Updating categories with undefined use_count...');
        
        // Update all categories where use_count is null or undefined
        const result = await prisma.category.updateMany({
            where: {
                use_count: null
            },
            data: {
                use_count: 0
            }
        });
        
        console.log(`Updated ${result.count} categories`);
        
        // Verify the fix
        const categories = await prisma.category.findMany({
            select: { id: true, name: true, use_count: true }
        });
        
        console.log('Categories after fix:');
        categories.forEach(cat => {
            console.log(`  ID: ${cat.id}, Name: ${cat.name}, Use Count: ${cat.use_count}`);
        });
        
    } catch (error) {
        console.error('Error fixing use_count:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the fix
fixUseCount();

// Also, here's the updated API code that handles undefined use_count in increment operations:
/*
// In the comment route file, update the increment logic to use coalesce
// This ensures it works even if use_count is undefined
await prisma.category.update({
    where: { id: categoryId },
    data: {
        // Use a raw SQL query to handle null/undefined values
        use_count: {
            raw: 'COALESCE(use_count, 0) + 1'
        }
    },
});

// Or, if raw SQL is not preferred, use a transaction with a check
const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { id: true, use_count: true }
});

await prisma.category.update({
    where: { id: categoryId },
    data: {
        use_count: (category?.use_count || 0) + 1
    },
});
*/
